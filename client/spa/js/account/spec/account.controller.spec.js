/**
 * Created by russia on 2/2/15.
 */
/*
 global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
 spyOn
 */

// Get the code you want to test
var Controller = require('../account.controller');
var $ = require('jquery');
var matchers = require('jasmine-jquery-matchers');

// Test suite
console.log('test account.controller');
describe('Account controller', function(){

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
        'accounts/:id': 'showAccount'
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

  describe('when calling showAccount', function(){

    beforeEach(function(){
      jasmine.addMatchers(matchers);
    });

    var success = function(callbacks){
      controller.model.set({'cust_name': 'valid account', 'account_type':'enterprise'});
      callbacks.success(controller.model);
    };
    var err = function(callbacks){
      callbacks.error('error', controller.model);
    };

    it('with a valid account id, fetches the model', function(){
      spyOn(controller.model, 'fetch').and.callFake(success);
      var cb = function(err, view){
        expect(err).toBeNull();
        expect(controller.model.get('cust_name')).toEqual('valid account');
      };
      controller.showAccount(1, cb);
    });

    it('with a valid account id, renders the view', function(){
      spyOn(controller.model, 'fetch').and.callFake(success);
      spyOn(controller.view, 'render').and.callFake(function(){
        controller.view.$el = 'fake render';
        return controller.view;
      });
      var cb = function(err, view){
        expect($('body')).toHaveText('fake render');
        expect(view.cid).toEqual(controller.view.cid);
      };
      controller.showAccount(1, cb);
    });

    it('with an invalid account id, renders an error message', function(){
      spyOn(controller.model, 'fetch').and.callFake(err);
      var cb = function(err, view){
        expect(err).toBeTruthy();
        expect($('body')).toHaveText(
          'There was a problem rendering this account');
      };
      controller.showAccount(1, cb);
    });

  });

});
