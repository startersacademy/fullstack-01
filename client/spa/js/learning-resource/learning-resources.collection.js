'use strict';

var Backbone = require('../vendor/index').Backbone;

module.exports = Backbone.Collection.extend({

  url: '/api/learning-resources/',

  initialize: function(){
    this.on('sortById', this.sortById);
    this.on('sortByTitle', this.sortByTitle);
    this.on('sortByResourceType', this.sortByResourceType);
    this.on('sortByAuthors', this.sortByAuthors);
    this.on('sortByDescription', this.sortByDescription);
    this.trigger('sortByTitle');
    this.trigger('sortByResourceType');
    this.trigger('sortByAuthors');
    this.trigger('sortByDescription');
  },

  sortById: function(){
    this.comparator = function(model){
      return model.get('id');
    };
    this.sort();
  },

  sortByTitle: function(){
    this.comparator = function(model){
      return model.get('title');
    };
    this.sort();
  },

  sortByResourceType: function(){
    this.comparator = function(model){
      return model.get('resourceType');
    };
    this.sort();
  },

  sortByAuthors: function(){
    this.comparator = function(model){
      return model.get('authors');
    };
    this.sort();
  },

  sortByDescription: function(){
    this.comparator = function(model){
      return model.get('description');
    };
    this.sort();
  }

});

