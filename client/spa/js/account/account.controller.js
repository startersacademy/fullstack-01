/**
 * Created by russia on 2/2/15.
 */
'use strict';

var Backbone = require('../vendor/index').Backbone;
var $ = require('../vendor/index').$;
var Model = require('./account.model');
var View = require('./account.view');

module.exports = Backbone.Controller.extend({

  routes: {
    'accounts/:id': 'showAccount'
  },

  initialize: function(){
    this.options.container = this.options.container || 'body';
    this.model = new Model();
    this.view = new View({model: this.model});
  },

  showAccount: function(accountId, cb){
    this.fetchModel(accountId, function(err){
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

  fetchModel: function(accountId, cb){
    this.model.set({id: accountId});

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
      '<p>There was a problem rendering this account</p>');
  }

});
