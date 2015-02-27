'use strict';

/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/
// Get the code you want to test
var Controller = require('../student.controller');
var $ = require('jquery');
var matchers = require('jasmine-jquery-matchers');
// Test suite
console.log('test student.controller');
describe('student controller', function(){
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
        'students/:id': 'showStudent'
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

  describe('when calling showstudent', function(){

    beforeEach(function(){
      jasmine.addMatchers(matchers);
    });

    var success = function(callbacks){
      controller.model.set({'firstName': 'valid firstName',
        'lastName': 'valid lastName'});
      callbacks.success(controller.model);
    };

    var err = function(callbacks){
      callbacks.error('error', controller.model);
    };

    it('with a valid student id, fetches the model', function(){
      spyOn(controller.model, 'fetch').and.callFake(success);
      var cb = function(err, view){
        expect(err).toBeNull();
        expect(controller.model.get('firstName')).toEqual('valid firstName');
        expect(controller.model.get('lastName')).toEqual('valid lastName');
      };

      controller.showStudent(1, cb);

    });

    it('with a valid student id, renders the view', function(){
      spyOn(controller.model, 'fetch').and.callFake(success);
      spyOn(controller.view, 'render').and.callFake(function(){
        controller.view.$el = 'fake render';
        return controller.view;
      });
      var cb = function(err, view){
        expect($('body')).toHaveText('');
        expect(view.cid).toEqual(controller.view.cid);
      };
      controller.showStudent(1, cb);
    });

    it('with an invalid student id, renders an error message', function(){
      spyOn(controller.model, 'fetch').and.callFake(err);
      var cb = function(err, view){
        expect(err).toBeTruthy();
        expect($('body')).toHaveText(
          'There was a problem rendering this student');
      };
      controller.showStudent('whatid', cb);
    });
  });
});
