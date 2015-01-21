/* global casper */

'use strict';

var path = require('path');
var gulp = require('gulp');
var casperJs = require('gulp-casperjs');
var run = require ('gulp-run');
var server = require('gulp-develop-server');
var gulpSequence = require('gulp-sequence');
var jasmine = require('gulp-jasmine');
var karma = require('karma').server;
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');


gulp.task('integrate', function(){
  gulp.src('./spec/integration/**')
    .pipe(casperjs({command:'test'}));
});

gulp.task('integrate:win', function () {
  var tests = ['./spec/integration'];
  var casperChild = spawn('casperjs.cmd', ['test'].concat(tests));
  casperChild.stdout.on('data', function (data) {
    gutil.log('CasperJS:', data.toString().slice(0, -1)); // Remove \n
  });

  casperChild.on('close', function (code) {
    console.log("Test has finished!");
  });

});

// Starts server for tasks that require a server
gulp.task('server:start', function(cb){
  server.listen({path: '.', delay: 3000}, cb);
});

// Stops server after tasks have run
gulp.task('server:stop', function(cb){
  server.kill();
});

// Runs integration tests with casperjs and phantomjs
gulp.task('test:integration', function (cb) {
  console.log('running integration tests');

  var integrationTestGlob = './spec/integration/**';

  gulp.src(integrationTestGlob)
    .pipe(casperJs({command:'test'}))
    .on('data', function(){})
    .on('end', cb)
    .on('error', cb);

});

// Runs api tests with frisbyjs and jasmine-node
gulp.task('test:api', function (cb) {
  console.log('running api tests');

  var apiTestDir = 'spec/api/';

  gulp.src(apiTestDir)
    .pipe(run('jasmine-node --verbose ' + apiTestDir))
    .on('data', function(){})
    .on('end', cb)
    .on('error', cb);

});

// Runs unit tests with karma
gulp.task('test:unit', function (cb) {
  console.log('running unit tests with karma');

  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false,
    autoWatch: false
  }, cb);

});

// Runs unit tests with karma
gulp.task('test:unit:tdd', function (cb) {
  console.log('running unit tests with karma');

  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false,
    autoWatch: true
  }, cb);

});


// Runs server unit tests with jasmine 2.1
gulp.task('test:server-unit', function (cb) {
  console.log('running unit tests');

  var unitTests = 'spec/server/**/*.spec.js';

  gulp.src(unitTests)
    .pipe(jasmine())
    .on('data', function(){})
    .on('end', cb)
    .on('error', cb);

});

gulp.task('test:lint', function(cb){
  gulp.src([
    'apps/**/*.js',
    'server/**/*.js',
    'spec/**/*.js',
    '!client/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .on('data', function(){})
    .on('end', cb)
    .on('error', cb);
});

gulp.task('watch', function(){
  gulp.watch([
    'apps/**/*.js',
    'client/**/*.js',
    'server/**/*.js',
    'spec/**/*.js'],
    ['test:lint','test:unit', 'test:server-unit']);
});

gulp.task('test:all',
  gulpSequence(
    'server:start',
    'test:api',
    'test:integration',
    'server:stop'));

