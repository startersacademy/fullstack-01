'use strict';

var Backbone = require('../vendor/index').Backbone;
var $ = require('../vendor/index').$;
var Model = require('./learning-resource.model');
var View = require('./learning-resource.view');

module.exports = Backbone.Controller.extend({

  routes: {
    'learning-resource/:': 'list',
    'learning-resource/:id': 'showLearningResource'
  },

  initialize: function(){
    this.options.container = this.options.container || 'body';
  },

  initializeModel: function(attributes){
    this.model = new Model(attributes);
    this.view = new View({model: this.model});
  },

  showLearningResource: function(learningResourceId){
    var self = this;
    var view = this.view;

    if (this.view) this.view.destroy(); //do i need this?

    this.initializeModel({id: learningResourceId});

    this.model.fetch({
      success: function(){
        view = self.renderView();
      },
      error: function() {
        view = self.renderError();
      }
    });
  },

  renderToContainer: function(view){
    return $(this.options.container).html(view);
  },

  renderView: function(){
    this.renderToContainer(this.view.render().$el);
    return this.view;
  },

  renderError: function(){
    return this.renderToContainer(
      '<p>There was a problem rendering this learning resource.</p>');
  }

});
