'use strict';
var Backbone = require('../vendor/index').Backbone;
var _ = require('../vendor/index')._;
var $ = require('../vendor/index').$;
var fs = require('fs'); //will be replaced by brfs in the browser
// readFileSync will be evaluated statically so errors can't be caught
var template = fs.readFileSync(__dirname + '/student.html', 'utf8');
var editTemplate = fs.readFileSync(__dirname + '/editStudent.html', 'utf8');

module.exports = Backbone.View.extend({

  className: 'student',

  template: _.template(template),

  editTemplate: _.template(editTemplate),

  events: {
    'click .delete': 'destroy',
    'click .modify': 'modify',
    'click .save': 'save',
    'click .cancel': 'cancel'
  },

  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'change', this.render);
  },

  render: function(){
    var context = this.model.toJSON();
    this.$el.html(this.template(context));
    return this;
  },

  destroy: function(){
    this.model.destroy();
  },

  modify: function(e){
    var context = this.model.toJSON();
    this.$el.html(this.editTemplate(context));

    return this;
  },

  save: function(e) {
    e.preventDefault(); // if there's no changes, do not do anything

    var formData = {
      firstName: this.$('#firstName').val().trim(),
      lastName: this.$('#lastName').val().trim()
    };
    var validate = {
      success: function() {
        $('#result').addClass('success')
                    .html('Successfully updated student')
                    .fadeIn().delay(4000).fadeOut();
      },
      error: function(model, error) {

      }
    };

    this.model.save(formData, validate);
  },

  cancel: function(e) {
    e.preventDefault();  // prevent event bubbling
    this.render();
  }

});
