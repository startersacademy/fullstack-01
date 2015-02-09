/* global window, require */

window.Backbone = require('./vendor').Backbone;

// Include your code
var Resource = require('./learning-resource/learning-resource.controller');

// Initialize it
window.resource = new Resource({router:true, container: 'body'});
var Contact = require('./contact/contact.controller');
var Contacts = require('./contact/contacts.controller');
// Initialize it
window.contact = new Contact({router:true, container: 'body'});
window.contacts = new Contacts({router:true, container: 'body'});

// Additional modules go here

/* global window require */
// This should be the last line
window.Backbone.history.start();
