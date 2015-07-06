'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');

var config = require('../../../config');

gulp.task('webpack', shell.task('webpack --config ../../webpack/webpack.config.js'));
// start
// 发布相关
gulp.task('release_test', ['webpack'], shell.task('fis3 release -Dompd ' + config.dest));
gulp.task('release_prod', ['webpack'], shell.task('fis3 release -Dompd ' + config.dest));

gulp.task('deploy_test', ['release_test'], function() {
    shell.task('npm run start_test', {
        cwd: config.dest
    })();
});

gulp.task('deploy_prod', ['release_prod'], function() {
    shell.task('npm run start_prod', {
        cwd: config.dest
    });
});
