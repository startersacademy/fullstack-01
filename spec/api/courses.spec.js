// spec/api/courses.spec.js

/* jshint quotmark:false */

// Add dependencies
var frisby = require('frisby');
// Set up variables for info you will use often
var url = 'http://localhost:3000/api/courses/';

var initialCourse = {
  "title": "Full Stack Dev I",
  "courseType": "Computer Science",
  "description": "Learn how to do single page apps advanced",
  "instructors": "Todd",
  "students": "Frances"
};
var changedCourse = {
  "title": "Front End Dev",
  "courseType": "Computer Science",
  "description": "Learn front end dev",
  "instructors": "Sam",
  "students": "Toby"
};
var noCourse = {
};
var noTitleCourse = {
  "courseType": "Marketing",
  "description": "How to market business",
  "instructors": "Mary",
  "students": "Frank"
};
var noCourseType = {
  "title": "Marketing 101",
  "description": "How to market business",
  "instructors": "Mary",
  "students": "Frank"
};
var noInstructors = {
  "title": "Front End Dev",
  "courseType": "Computer Science",
  "description": "Learn front end dev",
  "students": "Toby"
};
var noDescription = {
  "title": "Front End Dev",
  "courseType": "Computer Science",
  "instructors": "Sam",
  "students": "Toby"
};
var noStudents = {
  "title": "Front End Dev",
  "courseType": "Computer Science",
  "description": "Learn front end dev",
  "instructors": "Sam"
};
var badCourse = {
  "title": "Bad Dev",
  "courseType": "What class?",
  "description": "Learn nothin",
  "instructors": "Who"
};


// Create a course
function postCourse(){
  frisby.create('Create a course with post')
    .post(url, initialCourse, {json: true})

    //Assertions
    .expectStatus(200)  // 200 means success
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON(initialCourse)
    .afterJSON(function(json){
      getCourse(json.id);
    })
    .toss();  // done
}

// Read a course
function getCourse(id){
  frisby.create('Get course using id')
    .get(url + id)
    .expectStatus(200)
    .expectJSON(initialCourse)
    .afterJSON(function(json){
      putCourse(json.id);
    })
    .toss();
}

// Update a course
function putCourse(id){
  frisby.create('Get course using id')
    .put(url + id, changedCourse, {json: true})
    .expectStatus(200)
    .expectJSON(changedCourse)
    /*.afterJSON(function(json){
      deleteCourse(json.id);
    })*/
    .toss();
}


// Delete a course
function deleteCourse(id){
  frisby.create('Get course using id')
    .delete(url + id, {json: false})  // no need to check json file
    .expectStatus(204)  // no content available so return 204
    .toss();
}


// Send something that should trigger an error
function postBadCourse(){
  frisby.create('Enforce mandatory fields when creating')
    .post(url, badCourse, {json: true})
    .expectStatus(422)   // Semantic errors
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

function postBadTest(test){
  frisby.create('Enforce mandatory fields when creating')
    .post(url, test, {json: true})
    .expectStatus(422)   // Semantic errors
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

postCourse();
//putCourse(12);
//deleteCourse('54bda1c2b9984aeb84f37b83');
//postBadCourse();
//postBadTest(noTitleCourse);
