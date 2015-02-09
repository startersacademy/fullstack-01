'use strict';

var Backbone = require('../vendor/index').Backbone;

module.exports = Backbone.Collection.extend({

  url: '/api/learning-resources',

  initialize: function(){
    this.on('sortById', this.sortById);
    this.on('sortByName', this.sortByName);
    this.trigger('sortByName');
  },

  sortById: function(){
    this.comparator = function(model){
      return model.get('id');
    };
    this.sort();
  },

  sortByName: function(){
    this.comparator = function(model){
      return model.get('title');
    };
    this.sort();
  }

});

