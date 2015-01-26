/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var View = require('../learning-resource.view.js');
var matchers = require('jasmine-jquery-matchers');
var Backbone = require('../../vendor/index').Backbone;

// Test suite
console.log('test learning-resource.view');
describe('Learning resource view ', function(){

  var model;
  var view;

  beforeEach(function(){
    // Add some convenience tests for working with the DOM
    // Helper for toHaveClass
    jasmine.addMatchers(matchers);

    var Model = Backbone.Model.extend({});
    // Needs to have the fields required by the template
    model = new Model({
      title: 'Crisis Averted',
      resourceType: 'presentation',
      description: 'You are welcome.'
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
      expect(view.$el).toHaveClass('learning-resource');
    });
  });

  describe('when the view is rendered ', function(){

    it('returns the view object ', function(){
      expect(view.render()).toEqual(view);
    });

    it('produces the correct HTML ', function(){
      view.render();
      expect(view.$('#title').val()).toEqual('Crisis Averted');
    });

  });

  describe('when the user clicks on the Update button ', function(){

    it('updates the model', function(){
      view.$('.b-update').trigger('click');
    });

    it('sees the success message', function(){
      expect(view.$('#msg').html('Successfully updated'));
    });
  });

  describe('when the user clicks on the Edit button ', function(){

    it('opens the input fields', function(){
      view.$('.b-edit').trigger('click');
    });

    it('sees at least one input field', function(){
      view.$('.editing input');
    });
  });

  describe('when the user clicks on the Delete button ', function(){

    beforeEach(function(){
      // Must call through otherwise the actual view function won't be called
      spyOn(view, 'destroy').and.callThrough();
      // Must delegateEvents for the spy on a DOM event to work
      view.delegateEvents(); //allow bubbling

      spyOn(model, 'destroy');
    });

    it('deletes the model', function(){
      // Must render for the event to be fired
      view.render();
      view.$('.b-delete').trigger('click');

      expect(view.destroy).toHaveBeenCalled();
      expect(model.destroy).toHaveBeenCalled();
    });
  });

});
