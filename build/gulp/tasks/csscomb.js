'use strict';

var gulp = require('gulp');
var csscomb = require('gulp-csscomb');

// 对整体的样式文件进行规范化。
gulp.task('css', function() {
    gulp.src('components/**/**.scss')
        .pipe(csscomb())
        .pipe(gulp.dest('components'));

    gulp.src('client/**/**.scss')
        .pipe(csscomb())
        .pipe(gulp.dest('client'));
});
