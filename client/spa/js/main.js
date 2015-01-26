/* global window require */

window.Backbone = require('./vendor').Backbone;

// Include your code
var Resource = require('./learning-resource/learning-resource.controller');

// Initialize it
window.resource = new Resource({router:true, container: 'body'});

// Additional modules go here


// This should be the last line
window.Backbone.history.start();
