'use strict';

var gulp = require('gulp');
var casperjs = require('gulp-casperjs');
var spawn = require('child_process').spawn;
var run = require ('gulp-run');
var server = require('gulp-develop-server');
var gulpSequence = require('gulp-sequence');

gulp.task('test:integration', function (cb) {
 console.log('running integration tests');

 var integrationTestGlob = './spec/integration/**';

 gulp.src(integrationTestGlob)
   .pipe(casperjs({command:'test'}))
   .on('data', function(){})
   .on('end', cb)
   .on('error', cb);
});

gulp.task('test:integration:win', function (cb) {
  var tests = ['./spec/integration'];
  var casperChild = spawn('casperjs.cmd', ['test'].concat(tests));
  casperChild.stdout
  .on('data', function(){})
  .on('end', cb)
  .on('error', cb)
  .on('close', function (code) {
    console.log('Casper tests have finished!');
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

// Runs api tests with frisbyjs and jasmine-node
gulp.task('test:api', function (cb) {
  console.log('running api tests');

  var apiTestDir = 'spec/api/';

  gulp.src(apiTestDir)
    .pipe(run('jasmine-node ' + apiTestDir))
      .on('data', function(){})
      .on('end', cb)
      .on('error', cb);
});

// Run all specified tests with gulpSequence
gulp.task('test:win-all',
  gulpSequence(
  'server:start',
  'test:api',
  'test:integration:win',
  'server:stop'
  )
);
