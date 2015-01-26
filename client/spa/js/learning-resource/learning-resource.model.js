'use strict';

var Backbone = require('../vendor/index').Backbone;

module.exports = Backbone.Model.extend({

  defaults: {
    title: 'JavaScript Is Sexy',
    resourceType: 'link',
    description: 'Learn JavaScript properly.'
  },

  urlRoot: '/api/learning-resources',

  initialize: function(){
    this.on('change', function(){
      this.trigger('foo', 'bar');
    });
  },

  validate: function(attrs){
    if (!attrs.title){
      return 'title cannot be empty';
    }
  }
});

var Resource = Backbone.Model.extend({
  defaults: {
    resourceType: null
  }
});

var ResourceCollection = Backbone.Collection.extend({
  model: Resource
});

var resourceCollection = new ResourceCollection([
    {
      resourceType: 'document'
    },
    {
      resourceType: 'link'
    },
    {
      resourceType: 'presentation'
    }
]);
