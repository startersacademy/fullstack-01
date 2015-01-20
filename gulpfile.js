'use strict';

var gulp = require('gulp');
var run = require ('gulp-run');
var server = require('gulp-develop-server');
var gulpSequence = require('gulp-sequence');
var casperjs = require('gulp-casperjs');
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');

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

gulp.task('test:integration', function(cb) {
  console.log('running integration tests');

  var integrationTestDir = './spec/integration/**';

  gulp.src(integrationTestDir)
    .pipe(casperjs({command:'test'}))
      .on('data', function(){})
      .on('end', cb)
      .on('error', cb);
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
    .pipe(run('jasmine-node --verbose ' + apiTestDir))
      .on('data', function(){})
      .on('end', cb)
      .on('error', cb);
});

//'test:integration','server:stop'
gulp.task('test:all',
  gulpSequence(
  'server:start',
  'test:api',
  'test:integration',
  'server:stop'
  )
);
