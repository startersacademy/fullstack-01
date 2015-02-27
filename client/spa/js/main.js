/* global window, require */

window.Backbone = require('./vendor').Backbone;

// Include your code
var Instructor = require('./instructor/instructor.controller');
var Resource = require('./learning-resource/learning-resource.controller');
var Student = require('./student/student.controller');
var Students = require('./student/students.controller');

// Initialize it
window.instructor = new Instructor({router:true, container: 'body'});
window.resource = new Resource({router:true, container: 'body'});
window.student = new Student({router:true, container: 'body'});
window.students = new Students({router:true, container: 'body'});
// Additional modules go here


// This should be the last line
window.Backbone.history.start();
