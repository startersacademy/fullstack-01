/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var Backbone = require('../../vendor/index').Backbone;
var Controller = require('../learning-resources.controller');
var $ = require('jquery');
var matchers = require('jasmine-jquery-matchers');

// Test suite
console.log('test learning-resources.controller');
describe('Learning resources controller', function(){

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
        'learning-resources': 'showLearningResources'
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

  describe('when asked to showLearningResources', function(){

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
        controller.showLearningResources();
        expect(controller.collection).toBeDefined();
      });

      it('uses the existing collection if it is already setup', function(){
        controller.showLearningResources();
        controller.collection.add({id: 'xyz'});
        controller.showLearningResources();
        expect(controller.collection.at(0).get('id')).toEqual('xyz');
      });

      it('fetches data for the collection', function(){
        controller.showLearningResources();
        expect(controller.collection.fetch).toHaveBeenCalled();
      });

      it('sets up the view if it is not already', function(){
        expect(controller.view).not.toBeDefined();
        controller.showLearningResources();
        expect(controller.view).toBeDefined();
      });

      it('uses the existing view if it is already setup', function(){
        controller.showLearningResources();
        controller.view.test = true;
        controller.showLearningResources();
        expect(controller.view.test).toBeTruthy();
      });

      it('renders the view to the correct container', function() {
        spyOn(controller, 'renderView').and.callThrough();
        controller.showLearningResources();
        var returnedView = controller.renderView.calls.mostRecent().object.view;
        expect(returnedView).toEqual(controller.view);
        expect($('body h3')).toHaveText('Learning Resources');
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
        controller.showLearningResources();
        expect($('body')).toHaveText(
          'There was a problem rendering learning resources'
        );
      });

    });

  });

});

