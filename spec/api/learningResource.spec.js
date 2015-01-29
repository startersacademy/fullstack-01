

/* jshint quotmark:false */

var frisby = require('frisby');
var url = 'http://localhost:3000/api/learningResources/';
var initialRecord = {
  "title": "Javascript 101",
  "resourceType": "Digital Textbook",
  "description": "Interactive Textbook",
  "authors": "John Doe"
};

var changedRecord = {
  "title": "Mongo 101",
  "resourceType": "Textbook",
  "description": "Textbook",
  "authors": "Jane Doe"
};

var badRecord = {
  // empty record
};

//Create a record with Post
function postRecord() {
  frisby.create('Create learningResource with post')
    .post(url, initialRecord, {json: true})
    //{"title": "Javascript 101"},{json: true})
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON(initialRecord)
    .afterJSON(function(json) {
      getRecord(json.id);
    })
    .toss();
}

// Read Record with Get
function getRecord(id) {
  frisby.create('Get learningResource using id')
    .get(url + id)
    .expectStatus(200)
    .expectJSON(initialRecord)
    .afterJSON(function(json) {
      putRecord(json.id);
    })
    .toss();
}

// Update Record with Put
function putRecord(id){
  frisby.create('Put learningResource using id')
    .put(url + id, changedRecord, {json: true})
    .expectStatus(200)
    .expectJSON(changedRecord)
    .toss();
}

// Test Validation
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
            title: [
              'presence'
            ],
            resourceType: [
              'presence'
            ],
            description: [
              'presence'
            ]
          }}}})
    .toss();
}

// Post a record that will return an error


postRecord();
postBadRecord(badRecord);

