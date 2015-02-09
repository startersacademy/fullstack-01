/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var Collection = require('../learning-resources.collection');

// Test suite
console.log('test learning-resources.collection');
describe('Learning resources collection ', function(){

  var collection;
  var modelA;
  var modelB;
  var modelC;

  beforeEach(function(){
    // Set up test data
    modelA = {id: 2, title: 'A', resourceType: 'link', description: 'reading', authors: 'mom'};
    modelB = {id: 0, title: 'M', resourceType: 'presentation', description: 'mixing', authors: 'bro'};
    modelC = {id: 1, title: 'X', resourceType: 'document', description: 'listing', authors: 'hass'};

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


    it('orders the models by the contact id', function(){
      expect(collection.at(0).get('id')).toEqual(modelC.id);
      expect(collection.at(1).get('id')).toEqual(modelB.id);
      expect(collection.at(2).get('id')).toEqual(modelA.id);
    });

  });

  // describe('when the collection interacts with the server', function(){

  //   it('fetches from the correct url', function(){
  //     collection = new Collection();
  //     expect(collection.url).toEqual('/api/learning-resources/');
  //   });

  // });

  // describe('when a sort event is triggered', function(){

  //   beforeEach(function(){
  //     collection = new Collection();

  //     collection.add([
  //         modelC,
  //         modelB,
  //         modelA
  //       ],
  //       {silent: false} // Set to true to suppress add event
  //     );

  //   });

  //   it('sorts by id', function(){
  //     collection.trigger('sortByName');
  //     expect(collection.at(0).get('id')).toEqual(modelA.id);
  //     expect(collection.at(1).get('id')).toEqual(modelB.id);
  //     expect(collection.at(2).get('id')).toEqual(modelC.id);
  //   });

  //   it('sorts by name', function(){
  //     collection.trigger('sortById');
  //     expect(collection.at(0).get('id')).toEqual(modelB.id);
  //     expect(collection.at(1).get('id')).toEqual(modelC.id);
  //     expect(collection.at(2).get('id')).toEqual(modelA.id);
  //   });

  // });

});

