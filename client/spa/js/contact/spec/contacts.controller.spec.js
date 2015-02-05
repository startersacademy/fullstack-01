/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var Backbone = require('../../vendor/index').Backbone;
var Controller = require('../contacts.controller');
var $ = require('jquery');
var matchers = require('jasmine-jquery-matchers');

// Test suite
console.log('test contacts.controller');
describe('Contacts controller', function(){

  var controller;

  beforeEach(function(){
    controller = new Controller();
  });

  it('can be created', function(){
    expect(controller).toBeDefined();
  });

  describe('when it is created', function(){

    it('has the expected routes', function(){
      expect(controller.routes).toEqual(jasmine.objectContaining({
        'contacts': 'showContacts'
      }));
    });

    it('without a container option, uses body as the container', function(){
      expect(controller.options.container).toEqual('body');
    });

    it('with a container option, uses specified container', function(){
      var ctrl = new Controller({container: '.newcontainer'});
      expect(ctrl.options.container).toEqual('.newcontainer');
    });
  });

  describe('when asked to showContacts', function(){

    beforeEach(function(){
      jasmine.addMatchers(matchers);

    });

    describe('and fetch is successful', function(){

      beforeEach(function(){
        spyOn(Backbone.Collection.prototype, 'fetch').and.callFake(
          function(options){
            options.success();
          }
        );
      });

      it('sets up the collection if it is not already', function(){
        expect(controller.collection).not.toBeDefined();
        controller.showContacts();
        expect(controller.collection).toBeDefined();
      });

      it('uses the existing collection if it is already setup', function(){
        controller.showContacts();
        controller.collection.add({id: 'xyz'});
        controller.showContacts();
        expect(controller.collection.at(0).get('id')).toEqual('xyz');
      });

      it('fetches data for the collection', function(){
        controller.showContacts();
        expect(controller.collection.fetch).toHaveBeenCalled();
      });

      it('sets up the view if it is not already', function(){
        expect(controller.view).not.toBeDefined();
        controller.showContacts();
        expect(controller.view).toBeDefined();
      });

      it('uses the existing view if it is already setup', function(){
        controller.showContacts();
        controller.view.test = true;
        controller.showContacts();
        expect(controller.view.test).toBeTruthy();
      });

      it('renders the view to the correct container', function() {
        spyOn(controller, 'renderView').and.callThrough();
        controller.showContacts();
        var returnedView = controller.renderView.calls.mostRecent().object.view;
        expect(returnedView).toEqual(controller.view);
        expect($('body h1')).toHaveText('Contacts');
      });

    });

    describe('and fetch errors', function(){

      beforeEach(function(){
        spyOn(Backbone.Collection.prototype, 'fetch').and.callFake(
          function(options){
            options.error();
          }
        );
      });

      it('renders error', function(){
        controller.showContacts();
        expect($('body')).toHaveText('There was a problem rendering contacts');
      });

    });

  });

});

