'use strict';

var gulp = require('gulp');

// 在原装相关插件
gulp.task('preinstall', shell.task([
    'npm i -g fis3 --verbose',
    'npm i -g fis3-hook-module --verbose',
    'npm i -g fis-parser-sass3 --verbose',
    'npm i -g fis-optimizer-uglify-js --verbose',
    'npm i -g fis-optimizer-html-minifier --verbose',
    'npm i -g fis-optimizer-clean-css --verbose',
    'npm i -g fis-parser-babel2 --verbose',
    'npm i -g webpack --verbose',

    'npm i -g node-dev --verbose',
    'npm i -g node-inspector --verbose',

    'npm i -g browser-sync --verbose',
    'npm i -g browser-sync-vue --verbose',

    'npm i -g pm2 --verbose'
]));
