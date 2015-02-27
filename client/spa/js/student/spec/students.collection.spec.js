/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var Collection = require('../students.collection');

// Test suite
console.log('test students.collection');
describe('Students collection ', function(){

  var collection;
  var modelA;
  var modelB;
  var modelC;

  beforeEach(function(){
    // Set up test data
    modelA = {
      id: 2,
      firstName: 'Ar',
      lastName: 'gon'
    };
    modelB = {
      id: 0,
      firstName: 'He',
      lastName: 'lium'
    };
    modelC = {
      id: 1,
      firstName: 'Ne',
      lastName: 'on'
    };

  });


  describe('when models are added to the collection ', function(){

    beforeEach(function(){
      collection = new Collection();

      collection.add([
        modelC,
        modelB,
        modelA
      ],
        {silent: false} // Set to true to suppress add event
      );

    });

  });

  describe('when the collection interacts with the server', function(){

    it('fetches from the correct url', function(){
      collection = new Collection();
      expect(collection.url).toEqual('/api/students/');
    });

  });

  describe('when a sort event is triggered', function(){

    beforeEach(function(){
      collection = new Collection();

      collection.add([
          modelC,
          modelB,
          modelA
        ],
        {silent: false} // Set to true to suppress add event
      );

    });

    it('sorts by First Name', function(){
      collection.trigger('sortByFirstName');
      expect(collection.at(0).get('firstName')).toEqual(modelA.firstName);
      expect(collection.at(1).get('firstName')).toEqual(modelB.firstName);
      expect(collection.at(2).get('firstName')).toEqual(modelC.firstName);
    });

    it('sorts by Last Name', function(){
      collection.trigger('sortByLastName');
      expect(collection.at(0).get('lastName')).toEqual(modelA.lastName);
      expect(collection.at(1).get('lastName')).toEqual(modelB.lastName);
      expect(collection.at(2).get('lastName')).toEqual(modelC.lastName);
    });

  });

});

