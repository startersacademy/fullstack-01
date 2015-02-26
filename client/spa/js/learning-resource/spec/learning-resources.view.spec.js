/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var View = require('../learning-resources.view.js');
var matchers = require('jasmine-jquery-matchers');
var _ = require('../../vendor/index')._;
var Backbone = require('../../vendor/index').Backbone;

// Test suite
console.log('test learning-resources.view');
describe('Learning resources view ', function(){

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
      title: 'Meow',
      resourceType: 'presentation',
      description: 'Purrr',
      authors: 'Mr. Meowmers'
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
      expect(view.$el).toHaveClass('learning-resources');
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
      expect(view.$el[0]).toHaveText('Meow');
    });

  });

  // describe('when the user clicks on the Sort By Id button ', function(){

  //   beforeEach(function(){
  //     view.render();
  //   });

  //   it('triggers the sortById event on the collection', function(){
  //     var spy = jasmine.createSpy('sortById');
  //     collection.on('sortById', spy);

  //     view.$('.sortById').trigger('click');

  //     expect(spy).toHaveBeenCalled();

  //   });

  //   it('renders the view', function(){
  //     spyOn(view, 'render');

  //     view.$('.sortById').trigger('click');

  //     expect(view.render).toHaveBeenCalled();
  //   });

  // });

  describe('when the user clicks on the Title header ', function(){

    beforeEach(function(){
      view.render();
    });

    it('triggers the sortByTitle event on the collection', function(){
      var spy = jasmine.createSpy('sortByTitle');
      collection.on('sortByTitle', spy);

      view.$('.sortByTitle').trigger('click');

      expect(spy).toHaveBeenCalled();

    });

    it('renders the view', function(){
      spyOn(view, 'render');

      view.$('.sortByTitle').trigger('click');

      expect(view.render).toHaveBeenCalled();
    });

  });

  describe('when the user clicks on the Type header ', function(){

    beforeEach(function(){
      view.render();
    });

    it('triggers the sortByTitle event on the collection', function(){
      var spy = jasmine.createSpy('sortByResourceType');
      collection.on('sortByResourceType', spy);

      view.$('.sortByResourceType').trigger('click');

      expect(spy).toHaveBeenCalled();

    });

    it('renders the view', function(){
      spyOn(view, 'render');

      view.$('.sortByResourceType').trigger('click');

      expect(view.render).toHaveBeenCalled();
    });

  });

  describe('when the user clicks on the Authors header ', function(){

    beforeEach(function(){
      view.render();
    });

    it('triggers the sortByTitle event on the collection', function(){
      var spy = jasmine.createSpy('sortByAuthors');
      collection.on('sortByAuthors', spy);

      view.$('.sortByAuthors').trigger('click');

      expect(spy).toHaveBeenCalled();

    });

    it('renders the view', function(){
      spyOn(view, 'render');

      view.$('.sortByAuthors').trigger('click');

      expect(view.render).toHaveBeenCalled();
    });

  });

    describe('when the user clicks on the Description header ', function(){

    beforeEach(function(){
      view.render();
    });

    it('triggers the sortByDescription event on the collection', function(){
      var spy = jasmine.createSpy('sortByDescription');
      collection.on('sortByDescription', spy);

      view.$('.sortByDescription').trigger('click');

      expect(spy).toHaveBeenCalled();

    });

    it('renders the view', function(){
      spyOn(view, 'render');

      view.$('.sortByDescription').trigger('click');

      expect(view.render).toHaveBeenCalled();
    });

  });

});

