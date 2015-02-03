/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var Backbone = require('../../vendor/index').Backbone;
var Controller = require('../learning-resource.controller');
var $ = require('jquery');
var matchers = require('jasmine-jquery-matchers');

// Test suite
console.log('test learning-resource.controller');
describe('Learning resource controller', function(){

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
        'learning-resource/:id': 'showLearningResource'
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

  describe('when calling a model', function(){

    beforeEach(function(){
      jasmine.addMatchers(matchers);
      spyOn(controller, 'initializeModel').and.callThrough();
      spyOn(controller, 'showLearningResource').and.callThrough();
      spyOn(controller, 'renderView').and.callThrough();
      // spyOn(controller, 'renderError').and.callThrough();
    });

    it('with a valid id, fetches the model successfully', function(){
      spyOn(Backbone.Model.prototype, 'fetch').and.callFake(function(params){
        controller.model.set({'title': 'boil eggs'});
      });
      controller.showLearningResource(123);
      expect(controller.showLearningResource).toHaveBeenCalled();
      expect(controller.initializeModel).toHaveBeenCalled();
      expect(controller.model.get('title')).toEqual('boil eggs');
    });

    it('with a valid id, renders the view', function(){
      spyOn(Backbone.Model.prototype, 'fetch').and.callFake(function(params){
        controller.model.set({'title': 'boil eggs'});
      });
      controller.showLearningResource(123);
      spyOn(Backbone.View.prototype, 'render').and.callFake(function(params){
        controller.view.$el = 'fake render';
        return controller.view.$el;
      });
      console.log(controller.view.$el);
      expect(controller.renderView).toHaveBeenCalled();
      expect(controller.renderError).not.toHaveBeenCalled();
      expect($('body')).toHaveText('fake render');

    });

    xit('with a invalid id, fetches the model with error', function(){
      spyOn(Backbone.Model.prototype, 'fetch').and.callFake(function(params){
        params.error(controller.renderError);
      });
      controller.showLearningResource('monster');
      expect(controller.renderView).not.toHaveBeenCalled();
      expect(controller.renderError).toHaveBeenCalled();
    });

  });

});
