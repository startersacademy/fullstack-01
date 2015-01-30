/* global window, require */

window.Backbone = require('./vendor').Backbone;

// Include your code -- bundled into a package to run in the browser
var Instructor = require('./instructor/instructor.controller');
// Initialize it
window.instructor = new Instructor({router:true, container: 'body'});

// Additional modules go here


// This should be the last line
window.Backbone.history.start();
