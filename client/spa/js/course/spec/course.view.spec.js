/**
 * Created by rauldablaing on 2/2/15.
 */

/*
 global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
 spyOn
 */

// Get the code you want to test
var View = require('../course.view.js');
var matchers = require('jasmine-jquery-matchers');
var Backbone = require('../../vendor/index').Backbone;

// Test suite
console.log('test course.view');
describe('Course view ', function(){

  var model;
  var view;

  beforeEach(function(){
    // Add some convenience tests for working with the DOM
    jasmine.addMatchers(matchers);

    var Model = Backbone.Model.extend({});
    // Needs to have the fields required by the template
    model = new Model({
      title: 'Full Stack Dev I',
      courseType: 'video',
      description: 'Learn how to do single page apps advanced'
    });

    view = new View({
      model: model
    });
  });

  describe('when the view is instantiated ', function(){

    it('creates the correct element', function(){
      // Element has to be uppercase
      expect(view.el.nodeName).toEqual('DIV');
    });

    it('sets the correct class', function(){
      expect(view.$el).toHaveClass('course');
    });
  });

  describe('when the view is rendered ', function(){

    it('returns the view object ', function(){
      expect(view.render()).toEqual(view);
    });

    it('produces the correct HTML ', function(){
      view.render();
      expect(view.$('h1').html()).toEqual('Full Stack Dev I');
    });

  });

  xdescribe('when the user clicks on the Save button ', function(){

    xit('updates the model', function(){
    });
  });

  xdescribe('when the user clicks on ... ', function(){

    xit('triggers the ... event', function(){
    });
  });

  describe('when the user clicks on the Delete button ', function(){

    beforeEach(function(){
      // Must call through otherwise the actual view function won't be called
      spyOn(view, 'destroy').and.callThrough();
      // Must delegateEvents for the spy on a DOM event to work
      view.delegateEvents();

      spyOn(model, 'destroy');
    });

    it('deletes the model', function(){
      // Must render for the event to be fired
      view.render();
      view.$('.delete').trigger('click');

      expect(view.destroy).toHaveBeenCalled();
      expect(model.destroy).toHaveBeenCalled();
    });
  });

});
