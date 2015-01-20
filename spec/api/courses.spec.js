// spec/api/courses.spec.js

/* jshint quotmark:false */

// Add dependencies
var frisby = require('frisby');
// Set up variables for info you will use often
var url = 'http://localhost:3000/api/courses/';

var initialCourse = {
  "title": "Full Stack Dev I",
  "courseType": "video",
  "description": "Learn how to do single page apps advanced",
  "instructors": "Todd",
  "students": "Frances"
};
var changedCourse = {
  "title": "Front End Dev",
  "courseType": "instructor led",
  "description": "Learn front end dev",
  "instructors": "Sam",
  "students": "Toby"
};
var secondCourse = {
  "title": "Graphics",
  "courseType": "instructor led",
  "description": "Learn UX",
  "instructors": "Tom",
  "students": "Toby"
};
var thirdCourse = {
  "title": "Art Making",
  "courseType": "WBT",
  "description": "Learn painting",
  "instructors": "John",
  "students": "Frances"
};
var fourthCourse = {
  "title": "Videographer",
  "courseType": "video",
  "description": "Learn how to shoot videos",
  "instructors": "Mike",
  "students": "Toby"
};
var fiveCourse = {
  "title": "Piano",
  "courseType": "instructor led",
  "description": "Learn classical music",
  "instructors": "Susan",
  "students": "Frances"
};
var sixCourse = {
  "title": "Writing 101",
  "courseType": "video",
  "description": "Learn how to write stories",
  "instructors": "Mel",
  "students": "Toby"
};
var noCourse = {
};
var noTitleCourse = {
  "courseType": "WBT",
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
  "courseType": "WBT",
  "description": "Learn front end dev",
  "students": "Toby"
};
var noDescription = {
  "title": "Front End Dev",
  "courseType": "WBT",
  "instructors": "Sam",
  "students": "Toby"
};
var noStudents = {
  "title": "Front End Dev",
  "courseType": "WBT",
  "description": "Learn front end dev",
  "instructors": "Sam"
};
var marketCourse = {
  "title": "Marketing 101",
  "courseType": "marketing",
  "description": "Learn how to market",
  "instructors": "Todd",
  "students": "Frances"
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

// Create a course
function whichCourse(course){
  frisby.create('Create a course with post')
    .post(url, course, {json: true})

    //Assertions
    .expectStatus(200)  // 200 means success
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON(course)
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
    .post(url, noCourse, {json: true})
    .expectStatus(422)   // Semantic errors
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
            title: [
              'presence'
            ],
            courseType: [
              'presence'
            ],
            description: [
              'presence'
            ],
            instructors: [
              'presence'
            ],
            students: [
              'presence'
            ]
          }}}})
    .toss();
}

function postBadTitle(){
  frisby.create('Enforce mandatory title when creating')
    .post(url, noTitleCourse, {json: true})
    .expectStatus(422)   // Semantic errors
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
            title: [
              'presence'
            ]
          }}}})
    .toss();
}

function postBadType(){
  frisby.create('Enforce mandatory courseType when creating')
    .post(url, noCourseType, {json: true})
    .expectStatus(422)   // Semantic errors
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
            courseType: [
              'presence'
            ]
          }}}})
    .toss();
}

function postBadInstructors(){
  frisby.create('Enforce mandatory instructors when creating')
    .post(url, noInstructors, {json: true})
    .expectStatus(422)   // Semantic errors
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
            instructors: [
              'presence'
            ]
          }}}})
    .toss();
}

function postBadDescription(){
  frisby.create('Enforce mandatory description when creating')
    .post(url, noDescription, {json: true})
    .expectStatus(422)   // Semantic errors
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
            description: [
              'presence'
            ]
          }}}})
    .toss();
}

function postBadStudents(){
  frisby.create('Enforce mandatory students when creating')
    .post(url, noStudents, {json: true})
    .expectStatus(422)   // Semantic errors
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
            students: [
              'presence'
            ]
          }}}})
    .toss();
}

function postWrongType(){
  frisby.create('Enforce mandatory type must include -video, WBT, instructor led- when creating')
    .post(url, marketCourse, {json: true})
    .expectStatus(422)   // Semantic errors
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
            courseType: [
              'inclusion'
            ]
          }}}})
    .toss();
}


/* Call tests */
postCourse();
whichCourse(secondCourse);
whichCourse(thirdCourse);
whichCourse(fourthCourse);
whichCourse(fiveCourse);
whichCourse(sixCourse);
//putCourse('id here');  // update
//deleteCourse('54bda1c2b9984aeb84f37b83');

postBadCourse();
postBadTitle();
postBadType();
postBadInstructors();
postBadDescription();
postBadStudents();
postWrongType();
