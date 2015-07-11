'use strict';

var path = require('path');
var gulp = require('gulp');
var shell = require('gulp-shell');
var clean = require('gulp-clean');

var config = require('../../../config');

// 启动browser sync
gulp.task('browser-sync', function() {
    setTimeout(function() {
        shell.task('browser-sync start --config build/bs/bs-config.js', {
            cwd: config.root
        })();
    }, 15000);
});

gulp.task('webpack', shell.task('webpack --config ../../webpack/webpack.config.js'));
gulp.task('webpack-watch', shell.task('webpack --config ../../webpack/webpack.config.js --watch'));

// 开始处断点调试~~
gulp.task('inspector-brk', function() {
    shell.task('node-inspector --web-port=8081', {
        cwd: config.root
    })();

    setTimeout(function() {
        shell.task('node-dev --debug-brk server/index.js', {
            cwd: config.root
        })();
    }, 12000);
});

gulp.task('fis3-debug', function() {
    shell.task('node-inspector --web-port=8081', {
        cwd: config.root
    })();

    shell.task(path.join('node --debug ' + process.env['APPDATA'], 'npm/node_modules/fis3/bin/fis.js') + ' release -w -d ' + path.resolve(config.root, config.dest))();
});
gulp.task('fis3-server', function() {
    shell.task('node-inspector --web-port=8081', {
        cwd: config.root
    })();

    setTimeout(function() {
        shell.task('node-dev --debug server/index.js', {
            cwd: config.root
        })();
    }, 12000);
});
gulp.task('fis3-clean', function() {
    return gulp.src('process.env["LOCALAPPDATA"]' + '/.fis3-tmp/cache', {read: false})
        .pipe(clean());
});
gulp.task('fis3-release', ['fis3-clean', 'webpack'], shell.task('fis3 release --verbose -d ' + path.resolve(config.root, config.dest)));
gulp.task('fis3-watch',  shell.task('fis3 release -w -d ' + path.resolve(config.root, config.dest)));

// 对外命令
gulp.task('debug', ['fis3-watch', 'inspector-brk']);
gulp.task('dev', ['fis3-release'], function() {
    gulp.start('webpack-watch');
    gulp.start('fis3-watch');
    gulp.start('fis3-server');
    gulp.start('browser-sync');
});
