'use strict';

var path = require('path');
var _ = require('lodash');

var config = require('./config');
var meta = require('../package.json');

// Object.keys(process.env).forEach(function(env) {
//     console.log(env + '###' + process.env[env]);
// });
var env = process.env.NODE_ENV || 'development';

var dev_config = require('./development.json');
var pro_config = require('./production.json');

if (env === 'development') {
	config = _.assign(meta, config, dev_config, true);
} else if (env === 'production') {
	config = _.assign(meta, config, pro_config, true);
}

// 设置项目跟目录
config.root = path.resolve(__dirname, '..');

// 打印配置信息~
// console.log(JSON.stringify(config, null, 2));

module.exports = config;
