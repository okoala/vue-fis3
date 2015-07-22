'use strict'

var path = require('path')
var express = require('express')
var app = require('../index')

module.exports = function (dir) {
  if (!/^[\/|\\]/.test(dir)) {
    dir = path.join(app.get('root'), '/', dir)
  }

  return express.static(dir, {
    maxAge: app.get('env') === 'production' ? Infinity : 0
  })
}
