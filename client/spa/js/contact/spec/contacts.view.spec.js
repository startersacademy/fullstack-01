/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var View = require('../contacts.view.js');
var matchers = require('jasmine-jquery-matchers');
var _ = require('../../vendor/index')._;
var Backbone = require('../../vendor/index').Backbone;

// Test suite
console.log('test contacts.view');
describe('Contacts view ', function(){

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
      name: 'Contact <3',
      contactType: 'web'
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
      expect(view.$el).toHaveClass('contacts');
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
      expect(view.$('h1').html()).toEqual('Contacts');
      expect(view.$('.contact')[0]).toHaveText('Contact <3');
    });

  });

  describe('when the user clicks on the Sort By Id button ', function(){

    beforeEach(function(){
      view.render();
    });

    it('triggers the sortById event on the collection', function(){
      var spy = jasmine.createSpy('sortById');
      collection.on('sortById', spy);

      view.$('.sortById').trigger('click');

      expect(spy).toHaveBeenCalled();

    });

    it('renders the view', function(){
      spyOn(view, 'render');

      view.$('.sortById').trigger('click');

      expect(view.render).toHaveBeenCalled();
    });

  });

  xdescribe('when the user clicks on the Sort By Name button ', function(){

    xit('triggers the sortByName event on the collection', function(){
    });

    xit('renders the view', function(){

    });

  });

});

