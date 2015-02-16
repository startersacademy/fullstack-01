'use strict';

var Backbone = require('../vendor/index').Backbone;

module.exports = Backbone.Collection.extend({

  url: '/api/students/',

  initialize: function(){
    this.on('sortByFirstName', this.sortByFirstName);
    this.on('sortByLastName', this.sortByLastName);
    this.trigger('sortByFirstName');
    this.trigger('sortByLastName');
  },

  sortByFirstName: function(){
    this.comparator = function(model){
      return model.get('firstName');
    };
    this.sort();
  },

  sortByLastName: function(){
    this.comparator = function(model){
      return model.get('lastName');
    };
    this.sort();
  },

});

