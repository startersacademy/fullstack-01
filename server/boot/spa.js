'use strict';
/**
 * Mounts a single page application on route /spa
 * @namespace server/boot/spa
 * @param {Object} server - The loopback (express) application on which the
 * route will be mounted
 * @exports mountApps
 */
module.exports = function mountApps(server) {

  var router = server.loopback.Router();
  var staticMiddleware = server.loopback.static;

  server.use('/spa', setUpRouter(router, staticMiddleware));

};

/**
 * Sets up paths for single page application
 * @param {Object} router - express router
 * @param {function} staticMiddleware - middleware to handle requests to files
 * @requires path
 * @requires browserify
 * @requires brfs
 * @returns router
 */
function setUpRouter(router, staticMiddleware){
  var path = require('path');
  var browserify = require('browserify-middleware');
  var brfs = require('brfs');

  var clientPath = path.join(__dirname, '../..', '/client/');
  var clientRelativePath = '/client/';

  router.get('/index', function(req, res){
    res.sendFile(path.join(clientPath, 'spa-index.html'));
  });

  router.get('/js/build.js', browserify(
    path.join(clientPath, 'spa/js/main.js'),
    {
      transform: [ brfs ]
    }
  ));

  router.use('/', staticMiddleware(clientRelativePath));

  return router;
}




