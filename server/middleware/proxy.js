'use strict';

var httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxy();

module.exports = function (options) {
    if (typeof options === 'string') options = {target: options};

    return function (req, res, next) {
        // 干掉url最前面的斜杠，不然最后拼筹出来的url有问题
        req.url = req.url.replace(/\//, '');

        // 干掉header中的host，不然服务器的nginx会报错。
        delete req.headers.host;

        proxy.web(req, res, options, function (err) {
            err.mod = 'proxy';
            next(err);
        });
    };
};
