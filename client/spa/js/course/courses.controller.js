'use strict';

var Backbone = require('../vendor/index').Backbone;
var $ = require('../vendor/index').$;
var Model = require('./course.model');
var Collection = require('./courses.collection');
var View = require('./courses.view');

module.exports = Backbone.Controller.extend({
  routes: {
    'courses': 'showCourses'
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
      this.view.on('addNew', function() {
        // trigger the router for addNew
        this.navigate('courses/new', { trigger: true });
      }.bind(this));
      this.view.on('displayCourses', function() {
        // trigger display:courses from instructor
        this.trigger('display:courses');
      }.bind(this));
    }
    return this.view;
  },
  showCourses: function(){
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
    this.view.delegateEvents();
    return this.view;
  },
  renderError: function(){
    return this.renderToContainer(
      '<p>There was a problem rendering courses</p>');
  }
});
