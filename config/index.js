'use strict'

var path = require('path')
var _ = require('lodash')

var config = require('./config')
var meta = require('../package.json')

var env = process.env.NODE_ENV || 'development'

var _config = require('./' + env + '.json')

config = _.assign(meta, config, _config, true)
// 设置项目跟目录
config.root = path.resolve(__dirname, '..')

module.exports = config
