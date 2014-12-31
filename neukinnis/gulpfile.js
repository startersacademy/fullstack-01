var gulp = require('gulp');
var casperJs = require('gulp-casperjs');
gulp.task('integrate', function () {
  gulp.src('./spec/integration/**')
      .pipe(casperJs({command:'test'}));
});
