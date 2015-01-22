'use strict';

var gulp = require('gulp');
var casperjs = require('gulp-casperjs');
var spawn = require('child_process').spawn;
var gulpSequence = require('gulp-sequence');
var server = require('gulp-develop-server');
var jasmine = require('gulp-jasmine');

gulp.task('server:start', function(cb){
  server.listen({path: '.'}, cb);
});

gulp.task('server:stop', function(){
  server.kill();
});

gulp.task('test:integration', function() {
  return gulp.src('./spec/integration/**')
    .pipe(casperjs({command: 'test'}));
});

gulp.task('test:api', function(cb) {
  return gulp.src('./spec/api/**')
    .pipe(jasmine());
});

gulp.task('test:all',
  gulpSequence('server:start', 'test:api', 'test:integration', 'server:stop'));

gulp.task('test', ['test:all']);

gulp.task('default', ['server:start'], function() {
  gulp.watch(['./server/*.js']).on('change', server.changed);
});
