'use strict';

var Backbone = require('../vendor/index').Backbone;
var _ = require('../vendor/index')._;
var $ = require('../vendor/index').$;

var fs = require('fs'); //will be replaced by brfs in the browser

// readFileSync will be evaluated statically so errors can't be caught
var template = fs.readFileSync(__dirname + '/contact.html', 'utf8');

module.exports = Backbone.View.extend(
  /** @lends Contact-View.prototype */
  {

  /** .contact */
  className: 'contact',

  /** Underscore template at ./contact.html */
  template: _.template(template),

  /**
   * Triggers destroy when .delete is clicked
   */
  events: {
    'click .delete': 'destroy'
  },

  /**
   * @class Manages the view of an individual contact; view is removed when
   * the attached model is destroyed
   *
   * @requires Backbone
   * @requires _
   * @requires $
   * @requires fs
   * @requires /contact.html
   *
   * @augments Backbone.View
   * @memberof Contact
   *
   * @constructs Contact-View
   * @listens this.model:destroy > this.remove
   */
  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
  },

  /**
   * Renders template using attached model's attributes
   * @returns {view}
   */
  render: function(){
    var context = this.model.toJSON();
    this.$el.html(this.template(context));
    return this;
  },

  /** Destroys the attached model */
  destroy: function(){
    this.model.destroy();
  }

});


