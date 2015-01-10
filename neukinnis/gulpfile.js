var gulp = require('gulp');
var casperJs = require('gulp-casperjs');
var run = require ('gulp-run');

gulp.task('start-server', function(){
  console.log('starting server');
  var startServer = new run.Command('node .');
  startServer.exec();
});

gulp.task('integrate', ['start-server'], function () {
  console.log('starting to run integration tests');
  gulp.src('./spec/integration/**')
    .pipe(casperJs({command:'test'}));
});

