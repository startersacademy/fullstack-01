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
    this.model = new Model();
    this.view = new View({model: this.model});
  },

  // list: function(){
  //   this.resourceList = new Model();
  //   this.resourceListView = new View();
  //   this.resourceList.fetch();
  //   $('body').html(this.resourceListView.render.el);
  // },

  showLearningResource: function(learningResourceId, cb){
    this.fetchModel(learningResourceId, function(err){
      var view;

      if (err){
        view = this.renderError();
      } else {
        view = this.renderView();
      }

      if (cb){
        cb(err, view);
      }

    }.bind(this));
  },

  fetchModel: function(learningResourceId, cb){
    this.model.set({id: learningResourceId});

    this.model.fetch({
      success: function(model, response, options){
        //console.log(model);
        cb(null, model);
      },
      error: function(model, response, options){
        //console.error(response);
        cb(response, model);
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
