'use strict';

var Backbone = require('../vendor/index').Backbone;
module.exports = Backbone.Model.extend({
  defaults: {
  },
  urlRoot: '/api/instructors',
  initialize: function(){
    this.on('change', function(){
      this.trigger('foo', 'bar');
    });
  },
  validate: function(attrs){
    if (!attrs.instructor){
      return 'instructor cannot be empty';
    }
  }
});
