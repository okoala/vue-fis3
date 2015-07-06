'use strict';

// webpack.config.js
var path = require('path');

var config = require('../../config');
var components = config.components;

var nodeRoot = path.resolve(config.root, 'node_modules');
var outputPath = path.resolve(config.root, '.tmp') ;

var webpackConfig = {};

webpackConfig.entry = (function() {
    var _entry = {};

    components.forEach(function(name) {
        var pack = require(name + '/package.json');
        _entry[name] = path.resolve(nodeRoot, name, pack.main);
    });

    return _entry;
})();

webpackConfig.output = {
    path: outputPath,
    filename: '[name].js',
    libraryTarget: "umd"
}

module.exports = webpackConfig;
