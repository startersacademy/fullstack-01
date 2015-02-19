'use strict';
/**
 * Exposes dependencies for single page application
 * @module client/spa/js/vendor
 */

/** Expose underscore */
exports._ = require('underscore');

/** Expose jQuery */
exports.$ = require('jquery');

/** @namespace Backbone */
var Backbone = require('backbone');

/**
 * Patch Backbone with controller functionality
 * @class Backbone.Controller
 * @memberof Backbone
 */
var Controller = require('backbone.controller');

/**
 * Make jQuery available to Backbone
 * @memberof Backbone
 */
Backbone.$ = exports.$;

/** @class Backbone.View */
/**
 * Removes the view and unbinds event listeners to prevent 'ghost' views
 * @memberof Backbone.View
 */
Backbone.View.prototype.close = function(){
  if (this.beforeClose) {
    this.beforeClose();
  }
  this.remove();
  this.unbind();
};

/** Expose Backbone */
exports.Backbone = Backbone;
