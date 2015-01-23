'use strict';

var Backbone = require('../vendor/index').Backbone;

module.exports = Backbone.Model.extend({

  defaults: {
    title: 'JavaScript Is Sexy',
    resourceType: 'link',
    description: 'Learn JavaScript properly'
  },

  urlRoot: '/api/learning-resource',

  initialize: function(){
    this.on('change', function(){
      this.trigger('foo', 'bar');
    });
  },

  validate: function(attrs){
    if (!attrs.title){
      return 'name cannot be empty';
    }
  }
});
