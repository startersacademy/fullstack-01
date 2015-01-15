var spawn = require('child_process').spawn,
  gulp = require('gulp'),
  gutil = require('gulp-util');

gulp.task('integrate', function () {
  var tests = ['./spec/integration'];
  var casperChild = spawn('casperjs.cmd', ['test'].concat(tests));
  casperChild.stdout.on('data', function (data) {
    gutil.log('CasperJS:', data.toString().slice(0, -1)); // Remove \n
  });

  casperChild.on('close', function (code) {
    var success = code === 0; // Will be 1 in the event of failure
    console.log("Test has finished!");
  });
});
