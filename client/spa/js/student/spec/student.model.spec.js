'use strict';

/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/
// Get the code you want to test
var Model = require('../student.model');

// Test suite
console.log('test student.model');
describe('student model ', function(){
  var model;

  describe('when creating a new model ', function(){
    beforeEach(function(){
      model = new Model();
    });

    it('has the expected routes', function(){
      expect(model.urlRoot).toEqual('/api/students');
    });
  });

  describe('when updating the model for student with errorSpy ', function(){
    var errorSpy;

    beforeEach(function(){
      errorSpy = jasmine.createSpy('Invalid');
      model = new Model({
        id: 1,
        firstName: 'Frances',
        lastName: 'Go'
      });
      model.on('invalid', errorSpy);
    });

    it('does not save when firstName is empty ', function(){
      model.set('firstName', null);
      model.save();
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy.calls.mostRecent().args[0]).toBe(model);
      expect(errorSpy.calls.mostRecent().args[1][0]).toEqual(
        'firstName cannot be empty');
    });

    it('does not save when lastName is empty ', function(){
      model.set('lastName', null);
      model.save();
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy.calls.mostRecent().args[0]).toBe(model);
      expect(errorSpy.calls.mostRecent().args[1][0]).toEqual(
        'lastName cannot be empty');
    });
  });

  describe('when changing the state of the model without errorSpy', function(){

    beforeEach(function(){

      model = new Model({
        id: 1,
        firstName: 'Mike',
        lastName: 'Foster'
      });

    });

    it('does not save when firstName is empty ', function(){
      model.set('firstName', null);
      model.save();
      expect(model.validationError).toEqual(['firstName cannot be empty']);
    });

    it('does not save when lastName is empty ', function(){
      model.set('lastName', null);
      model.save();
      expect(model.validationError).toEqual(['lastName cannot be empty']);
    });

    it('does not save when firstName and lastName are empty ', function(){
      model.set({firstName:null, lastName:null});
      model.save();
      expect(model.validationError).toEqual(['firstName cannot be empty',
                                             'lastName cannot be empty']);
    });

  });
});
