/* global window, require */

window.Backbone = require('./vendor').Backbone;

// Include your code
var Account = require('./account/account.controller');
// Initialize it
window.account = new Account({router:true, container: 'body'});

// Additional modules go here


// This should be the last line
window.Backbone.history.start();
