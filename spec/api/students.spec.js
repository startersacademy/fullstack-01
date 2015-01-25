/**
 * Created by rauldablaing on 1/19/15.
 */

/* jshint quotmark:false */

// Add dependencies
var frisby = require('frisby');
// Set up variables for info you will use often
frisby.create('Create contact with post')
.post('http://localhost:3000/api/students',
  {
    firstName: "Jojo",
    lastName: "Jones"
  },
  {json: true})
.expectStatus(200)
.toss();
