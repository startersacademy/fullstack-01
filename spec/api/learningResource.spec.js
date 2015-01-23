/**
 * Created by russia on 1/18/15.
 */

var frisby = require('frisby');
frisby.create('Create learningResource with post')
  .post('http://localhost:3000/api/learningResources',
  {
    "name": "test person"
  },
  {json: true})
  .expectStatus(200)
  .toss();

/* jshint quotmark:false */


