'use strict';

/**
 * @namespace Contact
 */

var Backbone = require('../vendor/index').Backbone;
var $ = require('../vendor/index').$;
var Model = require('./contact.model');
var View = require('./contact.view');

module.exports = Backbone.Controller.extend(
  /** @lends Contact-Controller.prototype */
  {

    /**
     * Routes the controller is listening to
     * @property {string} 'contacts/:id' - Routes to showContact
     */
  routes: {
    'contacts/:id': 'showContact'
  },

    /**
     * @class Manages the contact module for an individual contact
     *
     * @requires Backbone
     * @requires $
     * @requires /contact.model
     * @requires /contact.view
     *
     * @augments Backbone.Controller
     * @memberof Contact
     *
     * @constructs Contact-Controller
     * @property {object} options.container - Defaults to body
     * @property {model} model - Defaults to new Model
     * @property {view} view - Defaults to new View
     */
  initialize: function(){
    this.options.container = this.options.container || 'body';
    this.model = new Model();
    this.view = new View({model: this.model});
  },

    /**
     * Fetches model and uses it to render the view or an error
     * @param {string|number} contactId - Contact's unique identifier
     * @param {function} cb - Callback to provide error or view to the calling
     * function
     */
  showContact: function(contactId, cb){
    this.fetchModel(contactId, function(err){
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

    /**
     * Fetches model data from server using the contact's unique identifier
     * @param contactId - Contact's unique identifier
     * @param cb - Callback to provide error or view to the calling function
     */
  fetchModel: function(contactId, cb){
    this.model.set({id: contactId});

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

    /**
     * Renders view to the controller's container
     * @param {html} view - Typically the view.$el
     * @returns {jQuery}
     */
  renderToContainer: function(view){
    return $(this.options.container).html(view);
  },

    /**
     * Renders the controller's view
     * @returns {exports.view}
     */
  renderView: function(){
    this.renderToContainer(this.view.render().$el);
    return this.view;
  },

    /**
     * Renders error message to the controller's container
     * @returns {jQuery}
     */
  renderError: function(){
    return this.renderToContainer(
      '<p>There was a problem rendering this contact</p>');
  }

});




