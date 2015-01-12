//ajeff-aboutus.spec.js

/* global casper */

casper.test.begin('About us page test', 3,
  function suite(test){
    casper.start('http://localhost/neukinnis/client/index.html', function(){
    test.assertTitle('Neukinnis', 'Finds the main page with title: Neukinnis');
    test.assertExists('a[href="aboutus.html"]', 'Checks existence link to about us page');
  });
  casper.then(function(){
    this.click('a[href="aboutus.html"]', 'Navigates and clicks on link to about us page');
  });
  casper.then(function(){
    test.assertTitle('About Us', 'Finds page title About Us');
    test.assertExists('a[href="privacy.html"]', 'Check existence of link to privacy page');
  });
  casper.then(function(){
    this.click('a[href="privacy.html"]', "Navigates and clicks on link to privage page");
  });
  casper.then(function(){
    test.assertTitle('Privacy', 'Finds page title Privacy');
    test.assertExists('a[href="index.html"]', 'Check existence of link to home page');
  });
  casper.then(function(){
    this.click('a[href="index.html"]', "Navigates and clicks on link to home page");
  });
    casper.then(function(){
    test.assertTitle('Neukinnis', 'Finds page title Neukinnis');
    test.assertExists('a[href="courses.html"]', 'Check existence of link to courses page');
  });
    casper.then(function(){
    this.click('a[href="courses.html"]', 'Navigates and clicks on link to courses page');
  });
    casper.then(function(){
    test.assertTitle('Courses', 'Finds page title Courses');
  });
  casper.run(function(){
    test.done();
  });
});