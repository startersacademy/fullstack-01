/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var View = require('../students.view.js');
var matchers = require('jasmine-jquery-matchers');
var _ = require('../../vendor/index')._;
var Backbone = require('../../vendor/index').Backbone;

// Test suite
console.log('test students.view');
describe('Students view ', function(){

  var model;
  var collection;
  var view;

  beforeEach(function(){
    // Add some convenience tests for working with the DOM
    jasmine.addMatchers(matchers);

    var Model = Backbone.Model.extend({});
    var Collection = Backbone.Collection.extend({model: Model});
    // Needs to have the fields required by the template
    model = new Model({
      firstName: 'Ash',
      lastName: 'Ketchum',
      skills: 'pokemon master, growl'
    });

    collection = new Collection(model);

    view = new View({
      collection: collection
    });
  });

  describe('when the view is instantiated ', function() {

    it('creates the correct element', function () {
      // Element has to be uppercase
      expect(view.el.nodeName).toEqual('DIV');
    });

    it('sets the correct class', function () {
      view.render();
      expect(view.$el).toHaveClass('students');
    });

  });

  describe('when collection events happen', function(){

    beforeEach(function () {
      spyOn(view, 'render').and.callThrough();
    });

    it('renders when something is added to the collection', function(){
      collection.trigger('add');
      expect(view.render).toHaveBeenCalled();
    });

    it('renders when the collection is reset', function(){
      collection.trigger('reset');
      expect(view.render).toHaveBeenCalled();
    });

    it('renders when the collection is sorted', function(){
      collection.trigger('sort');
      expect(view.render).toHaveBeenCalled();
    });

  });

  describe('when the view is rendered', function(){

    it('returns the view object', function(){
      expect(view.render()).toEqual(view);
    });
    it('produces the correct HTML', function(){
      view.render();
      expect(view.$el[0]).toHaveText('Ash');
    });

  });

  describe('when the user clicks on the First Name header ', function(){

    beforeEach(function(){
      view.render();
    });

    it('triggers the sortByFirstName event on the collection', function(){
      var spy = jasmine.createSpy('sortByFirstName');
      collection.on('sortByFirstName', spy);

      view.$('.sortByFirstName').trigger('click');

      expect(spy).toHaveBeenCalled();

    });

    it('renders the view', function(){
      spyOn(view, 'render');

      view.$('.sortByFirstName').trigger('click');

      expect(view.render).toHaveBeenCalled();
    });

  });

  describe('when the user clicks on the LastName header ', function(){

    beforeEach(function(){
      view.render();
    });

    it('triggers the sortByLastName event on the collection', function(){
      var spy = jasmine.createSpy('sortByLastName');
      collection.on('sortByLastName', spy);

      view.$('.sortByLastName').trigger('click');

      expect(spy).toHaveBeenCalled();

    });

    it('renders the view', function(){
      spyOn(view, 'render');

      view.$('.sortByLastName').trigger('click');

      expect(view.render).toHaveBeenCalled();
    });

  });

  describe('when the user clicks on the Skills header ', function(){

    beforeEach(function(){
      view.render();
    });

    it('triggers the sortBySkills event on the collection', function(){
      var spy = jasmine.createSpy('sortBySkills');
      collection.on('sortBySkills', spy);

      view.$('.sortBySkills').trigger('click');

      expect(spy).toHaveBeenCalled();

    });

    it('renders the view', function(){
      spyOn(view, 'render');

      view.$('.sortBySkills').trigger('click');

      expect(view.render).toHaveBeenCalled();
    });

  });

  // describe('when the user clicks on the Courses header ', function(){

  //   beforeEach(function(){
  //     view.render();
  //   });

  //   it('triggers the sortByCourses event on the collection', function(){
  //     var spy = jasmine.createSpy('sortByCourses');
  //     collection.on('sortByCourses', spy);

  //     view.$('.sortByCourses').trigger('click');

  //     expect(spy).toHaveBeenCalled();

  //   });

  //   it('renders the view', function(){
  //     spyOn(view, 'render');

  //     view.$('.sortByCourses').trigger('click');

  //     expect(view.render).toHaveBeenCalled();
  //   });

  // });

});

