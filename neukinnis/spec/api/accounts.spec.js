// spec/api/accounts.spec.js

/* jshint quotmark:false */

// Add dependencies
var frisby = require('frisby');
// Set up variables for info you will use often
var url = 'http://localhost:3000/api/accounts/';
var initialRecord = {
  "name": "Jeffrey",
  "account_type": "enterprise"
};
var changedRecord = {
  "name": "Frances",
  "account_type": "commercial"
};
var badRecord = {
  "xname": "Test Person 1",
  "xaccount_type": "federal"
};

// Create a record
function postRecord(){
  frisby.create('Create an account with post')
    .post(url, initialRecord, {json: true})
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON(initialRecord)
    .afterJSON(function(json){
      getRecord(json.id);
    })
    .toss();
}

// Read a record
function getRecord(id){
  frisby.create('Get account using id')
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
  frisby.create('Put account using id')
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
