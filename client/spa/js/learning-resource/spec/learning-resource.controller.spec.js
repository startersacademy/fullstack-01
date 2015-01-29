/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
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

  describe('when calling showLearningResource', function(){

    beforeEach(function(){
      jasmine.addMatchers(matchers);
    });

    var success = function(callbacks){
      controller.model.set({'title': 'JavaScript Is Sexy', 'resourceType':'link', 'description': 'Learn JavaScript properly.'});
      callbacks.success(controller.model);
    };
    var err = function(callbacks){
      callbacks.error('error', controller.model);
    };

    it('with a valid learning resource id, fetches the model', function(){
      spyOn(controller.model, 'fetch').and.callFake(success);
      var cb = function(err, view){
        expect(err).toBeNull();
        expect(controller.model.get('title')).toEqual('JavaScript Is Sexy');
      };
      controller.showLearningResource(1, cb);
    });

    it('with a valid learning resource, renders the view', function(){
      spyOn(controller.model, 'fetch').and.callFake(success);
      spyOn(controller.view, 'render').and.callFake(function(){
        controller.view.$el = 'fake render'; //not sure why this is done
        return controller.view;
      });
      var cb = function(err, view){
        expect($('body')).toHaveText('JavaScript Is Sexy');
        expect(view.cid).toEqual(controller.view.cid);
      };
      controller.showLearningResource(1, cb);
    });

    it('with an invalid resource type, renders an error message', function(){
      spyOn(controller.model, 'fetch').and.callFake(err);
      var cb = function(err, view){
        expect(err).toBeTruthy();
        expect($('body')).toHaveText(
          'There was a problem rendering this learning resource.');
      };
      controller.showLearningResource(1, cb);
    });

  });

});
