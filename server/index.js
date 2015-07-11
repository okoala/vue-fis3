'use strict';

var meta = require('../package.json'),
    express = require('express'),
    swig = require('swig'),
    compress = require('compression'),
    session = require('express-session'),
    lusca = require('lusca'),
    path = require('path'),
    app = module.exports = express(),
    middleware = ['csrf', 'combo', 'router', 'proxy', 'static', 'error'];

var config = require('../config');

// lazy load middlewares
middleware.forEach(function (m) {
    middleware.__defineGetter__(m, function () {
        return require('./middleware/' + m);
    });
});

process.on('uncaughtException', function (err) {
    (app.get('logger') || console).error('Uncaught exception:\n', err.stack);
});

// 使用swig作为模板引擎
app.engine('html', swig.renderFile);
app.set('name', meta.name);
app.set('version', meta.version);
app.set('port', process.env.PORT || 4000);
app.set('root', path.resolve(__dirname, '../').replace(/\/+$/, ''));
app.set('views', path.resolve(__dirname, '../').replace(/\/+$/, ''));
app.set('view engine', 'html');
app.set('view cache', config.view_cache);
app.set('logger', console);
app.enable('trust proxy');

swig.setDefaults({ cache: config.viewCache });

app.use(session({
    secret: 'fis3-vue',
    resave: true,
    saveUninitialized: true
}));

// 关闭lusca的csrf，使用自定义的
app.use(lusca({
    csrf: false,
    xframe: 'SAMEORIGIN',
    p3p: false,
    xssProtection: true
}));
app.use(middleware.csrf());

app.use(compress());
app.use('/co', middleware.combo());
app.use(middleware.router({index: path.resolve(config.dest, 'public/' + meta.version + '/index.html')}));

app.use('/api', middleware.proxy({target: config.api_target}));

app.use('/public', middleware.static(path.join(config.dest, '/public')));
app.use('/static', middleware.static(path.join(config.dest, '/static')));
app.use(middleware.error());

if (require.main === module) {
    app.listen(app.get('port'), function() {
        console.log('[%s] Express server listening on port %d',
            app.get('env').toUpperCase(), app.get('port'));
    });
}
