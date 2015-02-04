'use strict';

/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/
// Get the code you want to test
var Model = require('../instructor.model');

// Test suite
console.log('test instructor.model');
describe('Instructor model ', function(){
  var model;

  describe('when creating a new model ', function(){
    beforeEach(function(){
      model = new Model();
    });

    xit('initializes with custom logic', function(){
    });
  });

  describe('when updating the model for instructor ', function(){
    var errorSpy;

    beforeEach(function(){
      errorSpy = jasmine.createSpy('Invalid');
      model = new Model({
        id: 1
      });
      model.on('invalid', errorSpy);
      model.save();
    });

    it('does not save when firstName is empty ', function(){
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith(
        model,
        'firstName cannot be empty',
        { validate: true, validationError: 'firstName cannot be empty'}
      );
    });

    // Use if you have transformation logic on set
    xit('sets the values correctly ', function(){

    });

    // Use if you have transformation logic on get
    xit('retrieves the correct values ', function(){

    });
  });

  describe('when changing the state of the model ', function(){
    var eventSpy;

    beforeEach(function(){
      eventSpy = jasmine.createSpy('Change Event');
      model = new Model({
        id: 1,
        firstName: 'Mike',
        lastName: 'Foster'
      });
      model.on('foo', eventSpy);
      model.set({firstName: 'changed', lastName: 'changed'});
    });

    it('triggers the custom event foo', function(){
      expect(eventSpy).toHaveBeenCalled();
      expect(eventSpy).toHaveBeenCalledWith(
        'bar'
        );
    });
  });
});
