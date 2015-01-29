'use strict';

var gulp = require('gulp');
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');
var gulpSequence = require('gulp-sequence');
var server = require('gulp-develop-server');
var jasmine = require('gulp-jasmine');
var karma = require('karma').server;
var jshint = require('gulp-jshint');

// Starts server for tasks that require a server
gulp.task('server:start', function(cb){
  server.listen({path: '.', delay: 3000}, cb);
});

var stopServer = function(code){
  gutil.log('Stopping server');
  server.kill(function(){
    process.exit(code);
  });
};

// Stops server after tasks have run
gulp.task('server:stop', function(cb){
  server.kill(function(){
    cb();
  });
});


// Runs integration tests with casperjs and phantomjs
gulp.task('test:integration', function (cb) {
  var tests = ['spec/integration'];
  var isWindows = process.platform === 'win32';
  var casperCmd = 'casperjs';
  var onError = function(code){
    cb(code);
    stopServer(1);
  };

  if(isWindows){
    casperCmd = 'casperjs.cmd';
  }

  var casperChild = spawn(casperCmd, ['test'].concat(tests),
    {stdio: 'inherit'});

  casperChild.on('close', function (code) {
    // need to format this error properly
    if (code) {

      var err = {message: 'test failure'};

      onError(err);
    } else {
      cb();
    }
  });
});

// Runs api tests with frisbyjs and jasmine-node
gulp.task('test:api', function () {
  return gulp.src('./spec/api/**')
    .pipe(jasmine());
});

// Runs unit tests with karma
gulp.task('test:unit', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    autoWatch: false,
    reporters: ['dots']
  }, done);
});

// Runs unit tests with karma; will restart on change
gulp.task('test:unit:tdd', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false,
    autoWatch: true,
    reporters: ['dots']
  }, done);
});


// Runs server unit tests with jasmine 2.1
gulp.task('test:server-unit', function () {
  return gulp.src('server/**/*.spec.js')
    .pipe(jasmine());
});

gulp.task('test:lint', function(){
  return gulp.src([
    'apps/**/*.js',
    'server/**/*.js',
    'spec/**/*.js',
    '!client/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test:all',
  gulpSequence(
    'server:start',
    'test:lint',
    'test:server-unit',
    'test:api',
    'test:unit',
    'test:integration',
    'server:stop'));

gulp.task('test', ['test:all'], function(cb){
  cb();
  process.exit();
});

gulp.task('default', ['server:start'], function(){
  gulp.watch(['./server/*.js', './server/*.json']).on('change', server.changed);
});
