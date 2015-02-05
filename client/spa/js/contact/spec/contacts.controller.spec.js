/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
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

  describe('when calling showContacts', function(){

    beforeEach(function(){
      jasmine.addMatchers(matchers);
    });

    it('sets up the collection', function(){

    });

    it('fetches data for the collection', function(){

    });

    it('when fetch is successful, sets up the view', function(){

    });

    it('when fetch is successful, renders the view', function(){

    });

    it('when fetch errors, renders error', function(){

    });

  });

});

