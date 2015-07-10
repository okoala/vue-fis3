'use strict';

var path = require('path');
var gulp = require('gulp');
var shell = require('gulp-shell');

var config = require('../../../config');

gulp.task('server-profiler', function() {
    shell.task('node-profiler server/index.js', {
        cwd: config.root
    })();
});
