'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');

var config = require('../../../config');

gulp.task('webpack', shell.task('webpack --config ../../webpack/webpack.config.js'));
// start
// 发布相关
gulp.task('release', ['webpack'], shell.task('fis3 release deploy -d ' + config.dest));

gulp.task('deploy', ['release'], shell.task('npm run start', {
    cwd: config.dest
}));
