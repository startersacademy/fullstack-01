var gulp = require('gulp');
var casperJs = require('gulp-casperjs');
var run = require ('gulp-run');

gulp.task('start-server', function(cb){
  console.log('starting server');
  var startServer = new run.Command('node .');
  startServer.exec(null, cb);
});

gulp.task('integrate', ['start-server'], function (err) {
  console.log('starting to run integration tests');
  console.log(err);
  gulp.src('./spec/integration/**')
    .pipe(casperJs({command:'test'}));
});

