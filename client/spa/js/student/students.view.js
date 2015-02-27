'use strict';

var Backbone = require('../vendor/index').Backbone;
var _ = require('../vendor/index')._;

var fs = require('fs'); //will be replaced by brfs in the browser

// readFileSync will be evaluated statically so errors can't be caught
var template = fs.readFileSync(__dirname + '/students.html', 'utf8');

module.exports = Backbone.View.extend({

  className: 'students',

  template: _.template(template),

  events:{
    'click .sortByFirstName': 'sortByFirstName',
    'click .sortByLastName': 'sortByLastName',
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

  sortByFirstName: function(){
    this.collection.trigger('sortByFirstName');
    this.render();
  },

  sortByLastName: function(){
    this.collection.trigger('sortByLastName');
    this.render();
  },

});
