'use strict';
var Backbone = require('../vendor/index').Backbone;
var _ = require('../vendor/index')._;
var $ = require('../vendor/index').$;
var fs = require('fs'); //will be replaced by brfs in the browser
// readFileSync will be evaluated statically so errors can't be caught
var template = fs.readFileSync(__dirname + '/instructor.html', 'utf8');
var editTemplate = fs.readFileSync(__dirname + '/editInstructor.html', 'utf8');
// class, not an instance of courses
//var CoursesView = require('../course/courses.view');

module.exports = Backbone.View.extend({
  className: 'instructor',
  template: _.template(template),
  showTemplate: _.template(template),
  editTemplate: _.template(editTemplate),
  events: {
    'click .delete': 'destroy',
    'click .modify': 'modify',
    'click .save': 'save',
    'click .cancel': 'cancel',
    'click .displayCourses': 'displayCourses'
  },
  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'change', this.render);
//    this.coursesView = new CoursesView({instructor: this.model});
  },
  render: function(){
    var context = this.model.toJSON();
    this.$el.html(this.template(context));

    // if it's adding new model, change button to Add
    if (this.model.get('id') === undefined) {
      this.$('.save').html('Add');
    }

//    this.coursesView.render();

    return this;
  },
  displayCourses: function() {
    console.log('inside instructor display');
    // trigger event to populate the courses for this instructorId
    this.trigger('display:courses', {
      container: '.instructor-courses',
      instructorId: this.model.get('id')
    });
  },
  destroy: function(){
    this.model.destroy();

    $('body').append($('<div/>').addClass('instructor')
      .append($('<div/>')
        .addClass('container main')
        .append($('<div/>')
          .attr('id', 'result')
          .addClass('success content')
          .html('Successfully deleted instructor'))));

    this.remove();
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
        _.each(errors, function (err) {
          $('#result').addClass('error');

          $('input').find('.help-inline').text(err.message);
        }, this);
      }
    };

    this.model.save(formData, check);
  },
  cancel: function(e) {
    e.preventDefault();  // prevent event bubbling
    this.render();
  }
});
