'use strict';

var gulp = require('gulp');
var casperjs = require('gulp-casperjs');

gulp.task('integrate', function(){
    gulp.src('./spec/integration/**')
        .pipe(casperjs({command:'test'}));
});
