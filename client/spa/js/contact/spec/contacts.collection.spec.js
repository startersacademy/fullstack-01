/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var Collection = require('../contacts.collection');

// Test suite
console.log('test contacts.collection');
describe('Contacts collection ', function(){

  var collection;
  var modelA;
  var modelB;
  var modelC;

  beforeEach(function(){
    // Set up test data
    modelA = {id: 3, name: 'A'};
    modelB = {id: 1, name: 'B'};
    modelC = {id: 2, name: 'C'};
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


    it('orders the models by the contact name', function(){
      expect(collection.at(0).get('id')).toEqual(modelA.id);
      expect(collection.at(1).get('id')).toEqual(modelB.id);
      expect(collection.at(2).get('id')).toEqual(modelC.id);
    });

  });

  describe('when the collection interacts with the server', function(){

    it('fetches from the correct url', function(){
      collection = new Collection();
      expect(collection.url).toEqual('/api/contacts/');
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

    it('sorts by id', function(){
      collection.trigger('sortByName');
      expect(collection.at(0).get('id')).toEqual(modelA.id);
      expect(collection.at(1).get('id')).toEqual(modelB.id);
      expect(collection.at(2).get('id')).toEqual(modelC.id);
    });

    it('sorts by name', function(){
      collection.trigger('sortById');
      expect(collection.at(0).get('id')).toEqual(modelB.id);
      expect(collection.at(1).get('id')).toEqual(modelC.id);
      expect(collection.at(2).get('id')).toEqual(modelA.id);
    });

  });

});

