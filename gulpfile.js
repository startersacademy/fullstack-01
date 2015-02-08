'use strict';

var gulp = require('gulp');
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');
var gulpSequence = require('gulp-sequence');
var server = require('gulp-develop-server');
var jasmine = require('gulp-jasmine');
var karma = require('karma').server;
var jshint = require('gulp-jshint');
var winSpawn = require('win-spawn');

// Starts server for tasks that require a server
gulp.task('server:start', function(done){
  server.listen({path: '.', delay: 3000}, done);
});

gulp.task('server:restart', function(){
  server.changed(function(){
    // This will need to change for gulp v4
    gulp.run('test:server-unit');
  });
});

// Stops the server and the process in case of error
var stopServer = function(code){
  gutil.log('Stopping server');
  server.kill(function(){
    process.exit(code);
  });
};

// Stops server after tasks have run
gulp.task('server:stop', function(done){
  server.kill(done);
});


// Runs integration tests with casperjs and phantomjs
gulp.task('test:integration', function (done) {
  var tests = ['spec/integration'];
  var isWindows = process.platform === 'win32';
  var casperCmd = 'casperjs';
  var onError = function(code){
    done(code);
    // Gulp doesn't handle the error properly so clean up properly
    stopServer(1);
  };

  var casperChild;

  if(isWindows){
    casperCmd = 'casperjs.cmd';
    casperChild = winSpawn(casperCmd, ['test'].concat(tests),
    {}, function(){
      console.log('callback');
    });
  }
  else {
    casperChild = spawn(casperCmd, ['test'].concat(tests),
    {stdio: 'inherit'});
  }

  casperChild.on('close', function (code) {
    if (code) {
      console.log('error');
      // If there is an error, format the error object for gulp
      // Gulp depends on the this structure
      var err = {
        err: {
          msg: 'Integration test failure'
        },
        toString: function(){
          return err.err.msg;
        },
        showStack: false
      };
      onError(err);
    } else {
      // Everything is good
      console.log('close');
      done();
    }
  });
  console.log('task end');
});

//integration1
gulp.task('test:integration:alt1', function (done) {
  var tests = ['spec/integration'];
  var casperCmd = 'casperjs';
  var casperChild;
  var onError = function(code){
    done(code);
    // Gulp doesn't handle the error properly so clean up properly
    stopServer(1);
  };
  var windowsSpawn = function(executable, args, options){
    return spawn('cmd.exe',
      ['/c', executable].concat(args), options);
  };

  if(process.platform === 'win32'){
    casperChild = windowsSpawn(casperCmd, ['test'].concat(tests),
      {});
  } else {
    casperChild = spawn(casperCmd, ['test'].concat(tests),
      {stdio: 'inherit'});
  }

  // console.log(casperChild);
  casperChild.stdout.on('data', function (data) {
    console.log('CasperJS:', data.toString().slice(0, -1)); // Remove \n
   });
  casperChild.on('error', function(params){
    console.log(params);
  });

  casperChild.on('close', function (code) {
    if (code) {
      console.log('close error');
      // If there is an error, format the error object for gulp
      // Gulp depends on the this structure
      var err = {
        err: {
          msg: 'Integration test failure'
        },
        toString: function(){
          return err.err.msg;
        },
        showStack: false
      };
      onError(err);
    } else {
      console.log('close');
      // Everything is good
      done();
    }
  });

  console.log('task end');
});

// Runs api tests with frisbyjs and jasmine-node
gulp.task('test:api', function () {
  return gulp.src('./spec/api/**')
    .pipe(jasmine());
});

// Runs unit tests with karma
gulp.task('test:unit', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    autoWatch: false,
    reporters: ['dots']
  }, done);
});

// Runs unit tests with karma; will restart on change
gulp.task('test:unit:tdd', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false,
    autoWatch: true,
    reporters: ['dots']
  }, done);
});


// Runs server unit tests with jasmine 2.1
gulp.task('test:server-unit', function () {
  return gulp.src('server/**/*.spec.js')
    .pipe(jasmine());
});

// Runs lint tests with jshint
gulp.task('test:lint', function(){
  return gulp.src([
    'apps/**/*.js',
    'server/**/*.js',
    'spec/**/*.js',
    '!client/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Runs entire test suite
gulp.task('test:all',
  gulpSequence(
    'server:start',
    'test:lint',
    'test:server-unit',
    'test:api',
    'test:integration:alt1',
    'server:stop'));

// Shortcut to run the entire test suite
gulp.task('test', ['test:all'], function(done){
  // Using the callback before process.exit helps log seem finished
  done();
  process.exit();
});

// Restarts server on code changes
gulp.task('default', ['server:start'], function(){
  gulp.watch(['./server/*.js', './server/*.json'], function(){
    // This will need to change for gulp v4
    gulp.run('server:restart');
  });
});
