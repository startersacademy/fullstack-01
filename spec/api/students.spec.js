/**
 * Created by rauldablaing on 1/19/15.
 */

/* jshint quotmark:false */

// Add dependencies
var frisby = require('frisby');
// Set up variables for info you will use often
var url = 'http://localhost:3000/api/students/';
var initialRecord = {
  "firstName": "Jim",
  "lastName": "Smith",
  "courses": "JavaScript"
};
var changedRecord = {
  "lastName": "Jones"
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

// Read a record
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

// Update a record
function putRecord(id){
  frisby.create('Get contact using id')
    .put(url + id, changedRecord, {json: true})
    .expectStatus(200)
    .expectJSON(changedRecord)
    .toss();
}

// Send something that should trigger an error
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
          }}}})
    .toss();
}

postRecord();
postBadRecord();
