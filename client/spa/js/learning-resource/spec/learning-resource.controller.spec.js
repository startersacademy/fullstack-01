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
        'learning-resource/:': 'list',
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
      spyOn(controller, 'renderError').and.callThrough();
    });

    var success = function(callbacks){
      controller.model.set({
        'title': 'World Wide Web',
        'resourceType':'presentation',
        'description': 'Internet',
        'authors': ['Mi'],
      });
      callbacks.success(controller.model);
    };
    var error = function(callbacks){
      callbacks.error('error', controller.model);
    };

    it('with a valid learning resource id, fetches the model', function(){
      controller.initializeModel(123);
      spyOn(controller.model, 'fetch').and.callFake(success);
      expect(controller.initializeModel).toHaveBeenCalled();
      expect(controller.renderView).toHaveBeenCalled();
      expect(controller.renderError).not.toHaveBeenCalled();
    });

    it('with a invalid learning resource id, fetches the model', function(){
      controller.initializeModel('x');
      spyOn(controller.model, 'fetch').and.callFake(error);
      expect(controller.initializeModel).toHaveBeenCalled();
      expect(controller.renderError).toHaveBeenCalled();
      expect(controller.renderView).not.toHaveBeenCalled();
    });

    // it('with no learning resource id, does not fetch model', function(){
    //   controller.initializeModel();
    //   console.log(this.model);
    //   spyOn(controller.model, 'fetch');
    //   expect(controller.model.context).toBeUndefined();
    // });

  });

});
