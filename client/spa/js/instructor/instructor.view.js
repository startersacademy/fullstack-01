'use strict';
var Backbone = require('../vendor/index').Backbone;
var _ = require('../vendor/index')._;
var $ = require('../vendor/index').$;
var fs = require('fs'); //will be replaced by brfs in the browser
// readFileSync will be evaluated statically so errors can't be caught
var template = fs.readFileSync(__dirname + '/instructor.html', 'utf8');
var editTemplate = fs.readFileSync(__dirname + '/editInstructor.html', 'utf8');

module.exports = Backbone.View.extend({
  className: 'instructor',
  template: _.template(template),
  showTemplate: _.template(template),
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

    // if it's adding new model, change button to Add
    if (this.model.get('id') === undefined) {
      this.$('.save').html('Add');
    }

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
    // if there's no changes, do not do anything
    e.preventDefault();

    var formData = {
      firstName: this.$('#firstName').val().trim(),
      lastName: this.$('#lastName').val().trim(),
      skills: this.$('#skills').val().trim()
    };

    var check = {
      success: function() {
        $('#result').addClass('success')
        .html('Successfully updated instructor')
        .fadeIn().delay(4000).fadeOut();

        var addNew = $('.save').html();

        if (addNew === 'Add') {
          $('#added').addClass('success')
          .html('Successfully added new instructor')
          .fadeIn().delay(4000).fadeOut();
        }
      },
      error: function(model, errors) {
      }
    };

    this.model.save(formData, check);
  },
  cancel: function(e) {
    e.preventDefault();  // prevent event bubbling
    this.render();
  }
});
