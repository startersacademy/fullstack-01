// spec/api/accounts.spec.js

/* jshint quotmark:false */

// Add dependencies
var frisby = require('frisby');
// Set up variables for info you will use often
var url = 'http://localhost:3000/api/instructors/';
var initialRecord = {
  "firstName": "Jeff",
  "lastName": "Thomas",
  "courses": "C++",
  "skills": "C++"
};
var changedRecord = {
  "firstName": "Jeff",
  "lastName": "Thomas",
  "courses": "C++",
  "skills": "C++"
};
var emptyRecord = {
  //no properties and values
};
var missingRecord = {
  "firstName": "Jeff",
  "lastName": "Thomas"
};
var missingRecordTwo = {
  "firstName": "Jeff"

};
var emptyPropertyValues = {
  "firstName": "",
  "lastName": "",
  "courses": "",
  "skills": ""
};
/*var badPropertyName = {
  "ihaveaname": "Mr. Fail",
  "ihaveanaccount": "commercial"
};
var badPropertyValue = {
  "ihaveaname": "Mr. Invalid",
  "ihaveanaccount": "Seattle"
};
var badPropertyValueTwo = {
  "ihaveaname": "Mr. Invalid Two",
  "ihaveanaccount": ["commercial", "enterprise"]
};*/

// Create a record
function postRecord(){
  frisby.create('Create an instructor with post')
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
  frisby.create('Get instructor using id')
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
  frisby.create('Put instructor using id')
    .put(url + id, changedRecord, {json: true})
    .expectStatus(200)
    .expectJSON(changedRecord)
    .afterJSON(function(json){
      deleteRecord(json.id);
    })
    .toss();
}

// Delete a record
function deleteRecord(id) {
  frisby.create('Delete instructor using id')
    .delete(url + id, {json: false})
    .expectStatus(204)
    .toss();
}

// Send something that should trigger an error
function postBadRecord(record){
  frisby.create('Validation: Enforce mandatory fields when creating')
    .post(url, record, {json: true})
    .expectStatus(422)
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
          }}}})
    .toss();
}

postRecord();
/*getRecord();
postBadRecord(initialRecord); //Validates unique name
postBadRecord(emptyRecord);
postBadRecord(missingRecord);
postBadRecord(missingRecordTwo);
postBadRecord(emptyPropertyValues);
postBadRecord(badPropertyName);
postBadRecord(badPropertyValue);
postBadRecord(badPropertyValueTwo);
*/
