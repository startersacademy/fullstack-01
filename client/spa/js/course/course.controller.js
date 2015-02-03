/**
 * Created by rauldablaing on 2/2/15.
 */

'use strict';

var Backbone = require('../vendor/index').Backbone;
var $ = require('../vendor/index').$;
var Model = require('./course.model');
var View = require('./course.view');

module.exports = Backbone.Controller.extend({

  routes: {
    'course/:id': 'showCourse'
  },

  initialize: function(){
    this.options.container = this.options.container || 'body';
    this.model = new Model();
    this.view = new View({model: this.model});
  },

  showCourse: function(courseId, cb){
    this.fetchModel(courseId, function(err){
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

  fetchModel: function(courseId, cb){
    this.model.set({id: courseId});

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
      '<p>There was a problem rendering this course</p>');
  }

});

