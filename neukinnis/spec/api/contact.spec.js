/* jshint quotmark:false */

var frisby = require('frisby');
var url = 'http://localhost:3000/api/contacts/';

var initialRecord = {
  "name": "Test Person 1"
};
var changedRecord = {
  "name": "Change Person 1"
};
var badRecord = {
  "xname": "Test Person 1"
};

function postRecord(){
  frisby.create('Create a contact with post')
    .post(url, initialRecord, {json: true})
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON(initialRecord)
    .afterJSON(function(json){
      getRecord(json.id);
    })
    .toss();
}

function getRecord(id){
  frisby.create('Get contact using id')
    .get(url + id)
    .expectStatus(200)
    .expectJSON(initialRecord)
    .afterJSON(function(json){
      putRecord(json.id);
    })
    .toss();
}

function putRecord(id){
  frisby.create('Get contact using id')
    .put(url + id, changedRecord, {json: true})
    .expectStatus(200)
    .expectJSON(changedRecord)
    .toss();
}

function postBadRecord(){
  frisby.create('Enforce mandatory fields when creating')
    .post(url, badRecord, {json: true})
    .expectStatus(422)
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
            name: [
              'presence'
            ]
          }
        }
      }
    })
    .toss();
}

postRecord();
postBadRecord();




