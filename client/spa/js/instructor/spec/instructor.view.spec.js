'use strict';

/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/
// Get the code you want to test
var View = require('../instructor.view.js');
var matchers = require('jasmine-jquery-matchers');
var Backbone = require('../../vendor/index').Backbone;
// Test suite
console.log('test instructor.view');
describe('Instructor view ', function(){

  var model;
  var view;

  beforeEach(function(){

    // Add some convenience tests for working with the DOM
    jasmine.addMatchers(matchers);
    var Model = Backbone.Model.extend({});

    // Needs to have the fields required by the template
    model = new Model({
      firstName: 'Jeff',
      lastName: 'Thomas',
      skills: 'C++'
    });

    /*model2 = new Model{
      firstName: 'Tom',
      lastName: 'Shell',
      skills: 'Scripting'
    });

    model3 = new Model{
      firstName: 'Emily',
      lastName: 'Row',
      skills: 'Diving'
    });

    view = new View({
      model: model,
      model2: model2,
      model3: model3
    });*/

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
      expect(view.$el).toHaveClass('instructor');
    });
  });

  describe('when the view is rendered ', function(){
    it('returns the view object ', function(){
      expect(view.render()).toEqual(view);
    });

    it('produces the correct HTML ', function(){
      view.render();
      expect(view.$('h1').html()).toEqual('Jeff Thomas');
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
