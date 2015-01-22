'use strict';

var gulp = require('gulp');
var casperjs = require('gulp-casperjs');
var spawn = require('child_process').spawn;

gulp.task('integrate', function(){
  gulp.src('./spec/integration/**')
    .pipe(casperjs({command:'test'}));
});
