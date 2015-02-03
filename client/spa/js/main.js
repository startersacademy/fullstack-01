/* global window, require */

window.Backbone = require('./vendor').Backbone;

// Include your code
//var Contact = require('./contact/contact.controller');
// Initialize it
//window.contact = new Contact({router:true, container: 'body'});

var Course = require('./course/course.controller');
window.course = new Course({router:true, container: 'body'});

// Additional modules go here


// This should be the last line
window.Backbone.history.start();
