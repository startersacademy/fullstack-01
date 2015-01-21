'use strict';

module.exports = function mountApps(server) {

  var path = require('path');
  var browserify = require('browserify-middleware');
  var brfs = require('brfs');

  // Set up paths
  var clientPath = path.join(__dirname, '../..', '/client/spa');
  var clientRelativePath = '/client/spa';


  // Set up router
  var router = server.loopback.Router();

  router.get('/js/build.js', browserify(
    path.join(clientPath, 'js/main.js'),
    {
      transform: [ brfs ]
    }
  ));

  router.use('/', server.loopback.static(clientRelativePath));


  // Mount the router on the app
  server.use('/spa', router);

};



