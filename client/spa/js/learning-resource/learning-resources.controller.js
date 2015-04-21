'use strict';

var Backbone = require('../vendor/index').Backbone;
var $ = require('../vendor/index').$;
var Model = require('./learning-resource.model');
var Collection = require('./learning-resources.collection');
var View = require('./learning-resources.view');

module.exports = Backbone.Controller.extend({

  routes: {
    'learning-resources': 'showLearningResources'
  },

  initialize: function(){
    this.options.container = this.options.container || 'body';
  },

  getCollection: function(){
    if (!this.collection){
      Collection = Collection.extend({model: Model});
      this.collection = new Collection();
    }
    return this.collection;
  },

  getView: function(){
    if (!this.view){
      var V = View.extend({collection: this.collection});
      this.view = new V();
    }
    return this.view;
  },

  showLearningResources: function(){
    var self = this;
    this.getCollection().fetch({
      success: function(collection, response, options){
        self.getView();
        self.renderView();
      },
      error: function(collection, response, options){
        self.renderError();
      }
    });
  },

  renderToContainer: function(html){
    return $(this.options.container).html(html);
  },

  renderView: function(){
    this.renderToContainer(this.view.render().$el);
    return this.view;
  },

  renderError: function(){
    return this.renderToContainer(
      '<p>There was a problem rendering learning resources</p>');
  }

});
