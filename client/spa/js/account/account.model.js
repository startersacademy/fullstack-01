/**
 * Created by russia on 2/2/15.
 */
'use strict';

var Backbone = require('../vendor/index').Backbone;

module.exports = Backbone.Model.extend({

  defaults: {
    account_type: 'enterprise'
  },

  urlRoot: '/api/account',

  initialize: function(){
    this.on('change', function(){
      this.trigger('foo', 'bar');
    });
  },

  validate: function(attrs) {
    if (!attrs.cust_name) {
      return 'name cannot be empty';
    }
    if (!attrs.account_type) {
      return 'name cannot be empty';
    }
  }
});
