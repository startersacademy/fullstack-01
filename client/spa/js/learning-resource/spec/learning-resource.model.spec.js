/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var Model = require('../learning-resource.model');

// Test suite
console.log('test learning.model');
describe('Learning resource model', function(){

  var model;

  describe('when creating a new model', function(){

    beforeEach(function(){
      model = new Model();
    });

    it('sets the correct default values', function(){
      expect(model.get('title')).toEqual('JavaScript Is Sexy');
      expect(model.get('resourceType')).toEqual('link');
      expect(model.get('description')).toEqual('Learn JavaScript properly.');
    });
  });
});
