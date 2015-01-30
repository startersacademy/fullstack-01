'use strict';

var Backbone = require('../vendor/index').Backbone;
module.exports = Backbone.Model.extend({
  defaults: {
    firstName: '',
    lastName: '',
    skills: ''
  },
  urlRoot: '/api/instructors',
  initialize: function(){
    this.on('change', function(){
      this.trigger('foo', 'bar');
    });
  },
  validate: function(attrs){
    if (!attrs.firstName){
      return 'firstName cannot be empty';
    }
    if (!attrs.lastName){
      return 'lastName cannot be empty';
    }
    if (!attrs.skills){
      return 'skills cannot be empty';
    }
  }
});
