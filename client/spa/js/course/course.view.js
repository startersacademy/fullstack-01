/**
 * Created by rauldablaing on 2/2/15.
 */

'use strict';

var Backbone = require('../vendor/index').Backbone;
var _ = require('../vendor/index')._;
var $ = require('../vendor/index').$;

var fs = require('fs'); //will be replaced by brfs in the browser

// readFileSync will be evaluated statically so errors can't be caught
var template = fs.readFileSync(__dirname + '/course.html', 'utf8');

module.exports = Backbone.View.extend({

  className: 'course',

  template: _.template(template),

  events: {
    'click .delete': 'destroy'
  },

  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
  },

  render: function(){
    var context = this.model.toJSON();
    this.$el.html(this.template(context));
    return this;
  },

  destroy: function(){
    this.model.destroy();
  }

});
