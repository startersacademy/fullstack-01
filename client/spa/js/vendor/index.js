'use strict';
/** @module client/vendor */
/** @namespace Backbone */
/** @namespace Backbone.View */

/**
 * Expose underscore
 */
exports._ = require('underscore');

/**
 * Expose jQuery
 */
exports.$ = require('jquery');



var Backbone = require('backbone');

/**
 * Patch Backbone with controller functionality
 * @type {root.Backbone.Controller}
 * @name Backbone.Controller
 */
var Controller = require('backbone.controller');

/**
 * Make jQuery available to Backbone
 */
Backbone.$ = exports.$;

/**
 * Patch Backbone.View with close function to prevent 'ghost' views
 * @lends Backbone.View
 */
Backbone.View.prototype.close = function(){
  if (this.beforeClose) {
    this.beforeClose();
  }
  this.remove();
  this.unbind();
};

/**
 * Expose Backbone
 */
exports.Backbone = Backbone;
