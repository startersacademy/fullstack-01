'use strict';

var gulp = require('gulp');
var casperjs = require('gulp-casperjs');
var spawn = require('child_process').spawn;
var server = require('gulp-develop-server');

gulp.task('server:start', function(cb){
  server.listen({path: '.'}, cb);
});

gulp.task('server:stop', function(){
  server.kill();
});

gulp.task('integrate', function(){
  gulp.src('./spec/integration/**')
    .pipe(casperjs({command:'test'}));
});

gulp.task('default', ['server:start'], function() {
  gulp.watch(['./server/*.js']).on('change', server.changed);
});
