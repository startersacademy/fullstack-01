'use strict';

var Backbone = require('../vendor/index').Backbone;
var _ = require('../vendor/index')._;
var fs = require('fs'); //will be replaced by brfs in the browser
// readFileSync will be evaluated statically so errors can't be caught
var template = fs.readFileSync(__dirname + '/courses.html', 'utf8');


module.exports = Backbone.View.extend({
  className: 'courses',
  template: _.template(template),
  events:{
    'click .sortById': 'sortById',
    'click .sortByTitle': 'sortByTitle',
    'click .sortByCourseType': 'sortByCourseType',
    'click .addNew': 'addNew',
    'click .filterByCourseType': 'filterByCourseType'
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

  addNew: function() {
    this.trigger('addNew');
    this.render();
  },

  sortById: function(){
    this.collection.trigger('sortById');
    this.render();
  },

  sortByTitle: function(){
    this.collection.trigger('sortByTitle');
    this.render();
  },

  sortByCourseType: function(){
    this.collection.trigger('sortByCourseType');
    this.render();
  },

  filterByCourseType: function() {
    this.collection.trigger('filterByCourseType');
    this.render();
  }
});
