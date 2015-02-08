/* global window, require */

window.Backbone = require('./vendor').Backbone;

// Include your code
var Instructor = require('./instructor/instructor.controller');
var Instructors = require('./instructor/instructors.controller');
// Initialize it
window.instructor = new Instructor({router:true, container: 'body'});
window.instructors = new Instructors({router:true, container: 'body'});
// Additional modules go here


// This should be the last line
window.Backbone.history.start();
