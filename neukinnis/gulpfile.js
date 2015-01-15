'use strict';

var gulp = require('gulp');
var casperjs = require('gulp-casperjs');
var server = require('./server/server.js');

gulp.task('integrate', function(){
  server.start();
  gulp.src('./spec/integration/**')
    .pipe(casperjs({command:'test'}));
});
