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
    modelA = {
      id: 2,
      title: 'A',
      resourceType: 'link',
      description: 'reading',
      authors: 'mom'
    };
    modelB = {id: 0,
      title: 'M',
      resourceType: 'presentation',
      description: 'mixing',
      authors: 'bro'
    };
    modelC = {id: 1,
      title: 'X',
      resourceType: 'document',
      description: 'listing',
      authors: 'hass'
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


    it('orders the models by the contact id', function(){
      expect(collection.at(0).get('id')).toEqual(modelC.id);
      expect(collection.at(1).get('id')).toEqual(modelB.id);
      expect(collection.at(2).get('id')).toEqual(modelA.id);
    });

  });

  describe('when the collection interacts with the server', function(){

    it('fetches from the correct url', function(){
      collection = new Collection();
      expect(collection.url).toEqual('/api/learning-resources/');
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

    it('sorts by title', function(){
      collection.trigger('sortByTitle');
      expect(collection.at(0).get('title')).toEqual(modelA.title);
      expect(collection.at(1).get('title')).toEqual(modelB.title);
      expect(collection.at(2).get('title')).toEqual(modelC.title);
    });

    it('sorts by resource type', function(){
      collection.trigger('sortByResourceType');
      expect(collection.at(0).get('resourceType')).toEqual(modelC.resourceType);
      expect(collection.at(1).get('resourceType')).toEqual(modelA.resourceType);
      expect(collection.at(2).get('resourceType')).toEqual(modelB.resourceType);
    });

    it('sorts by authors', function(){
      collection.trigger('sortByAuthors');
      expect(collection.at(0).get('authors')).toEqual(modelB.authors);
      expect(collection.at(1).get('authors')).toEqual(modelC.authors);
      expect(collection.at(2).get('authors')).toEqual(modelA.authors);
    });

    it('sorts by description', function(){
      collection.trigger('sortByDescription');
      expect(collection.at(0).get('description')).toEqual(modelC.description);
      expect(collection.at(1).get('description')).toEqual(modelB.description);
      expect(collection.at(2).get('description')).toEqual(modelA.description);
    });

  });

});

