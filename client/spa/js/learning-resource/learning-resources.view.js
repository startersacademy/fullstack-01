'use strict';

var Backbone = require('../vendor/index').Backbone;
var _ = require('../vendor/index')._;

var fs = require('fs'); //will be replaced by brfs in the browser

// readFileSync will be evaluated statically so errors can't be caught
var template = fs.readFileSync(__dirname + '/learning-resources.html', 'utf8');

module.exports = Backbone.View.extend({

  className: 'learning-resources',

  template: _.template(template),

  events:{
    'click .sortById': 'sortById',
    'click .sortByTitle': 'sortByTitle',
    'click .sortByResourceType': 'sortByResourceType',
    'click .sortByAuthors': 'sortByAuthors',
    'click .sortByDescription': 'sortByDescription'
  },

  initialize: function() {
    this.listenTo(this.collection, 'add', function(){
      this.render();
    });
    this.listenTo(this.collection, 'reset', function(){
      this.render();
    });
    this.listenTo(this.collection, 'sort', function(){
      this.render();
    });
  },

  render: function() {
    var context = this.collection;
    this.$el.html(this.template(context));
    return this;
  },

  sortById: function(){
    this.collection.trigger('sortById');
    this.render();
  },

  sortByTitle: function(){
    this.collection.trigger('sortByTitle');
    this.render();
  },

  sortByResourceType: function(){
    this.collection.trigger('sortByResourceType');
    this.render();
  },

  sortByAuthors: function(){
    this.collection.trigger('sortByAuthors');
    this.render();
  },

  sortByDescription: function(){
    this.collection.trigger('sortByDescription');
    this.render();
  }

});

