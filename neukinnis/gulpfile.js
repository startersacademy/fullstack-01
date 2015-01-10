/* global casper */

var gulp = require('gulp');
var casperJs = require('gulp-casperjs');
//var run = require ('gulp-run');
var server = require('gulp-develop-server');

//gulp.task('server:start', function(){
//  console.log('starting server');
//  var startServer = new run.Command('node .');
//  startServer.exec();
//});

gulp.task('server:start', function(cb){
  server.listen({path: '.', delay: 3000}, cb);
});

gulp.task('integrate', ['server:start'], function (err) {
  console.log('starting to run integration tests');
  gulp.src('./spec/integration/**')
      .pipe(casperJs({command:'test'}));
});

