'use strict';

var gulp = require('gulp');
var run = require ('gulp-run');
var server = require('gulp-develop-server');
var gulpSequence = require('gulp-sequence');
var casperjs = require('gulp-casperjs');

// Starts server for tasks that require a server
gulp.task('server:start', function(cb){
  server.listen({path: '.', delay: 3000}, cb);
});

// Stops server after tasks have run
gulp.task('server:stop', function(cb){
  server.kill();
});

// Runs navigational tests with casperjs
// gulp.task('test:integration', function(){
//     gulp.src('./spec/integration/**')
//         .pipe(casperjs({command:'test'}));
// });

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
gulp.task('test:all',
  gulpSequence(
  'server:start',
  'test:api',
  'test:integration',
  'server:stop'
  )
);
