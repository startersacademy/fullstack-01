/**
 * Created by rauldablaing on 1/31/15.
 */

'use strict';

var Backbone = require('../vendor/index').Backbone;

module.exports = Backbone.Model.extend({

  defaults: {
    courseType: 'video'
  },

  urlRoot: '/api/courses',

  initialize: function(){
    this.on('change', function(){
      this.trigger('foo', 'bar');
    });
  },

  validate: function(attrs){
    if (!attrs.title){
      return 'title cannot be empty';
    }
    if (!attrs.courseType){
      return 'course type cannot be empty';
    }
    if (!attrs.description){
      return 'description cannot be empty';
    }
  }
});
