'use strict';

var gulp = require('gulp');
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
