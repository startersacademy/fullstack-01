'use strict';

var Backbone = require('../vendor/index').Backbone;

module.exports = Backbone.Model.extend({

  defaults: {
    contactType: 'web'
  },

  urlRoot: '/api/contacts',

  initialize: function(){
    this.on('change', function(){
      this.trigger('foo', 'bar');
    });
  },

  validate: function(attrs){
    if (!attrs.name){
      return 'name cannot be empty';
    }
  }
});
