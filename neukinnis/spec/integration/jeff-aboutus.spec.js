//test-name.spec.js

/* global casper */

casper.test.begin('About us page test', 3,
  function suite(test){
    casper.start('http://localhost/neukinnis/client/aboutus.html', function(){
    test.assertTitle('About Us', 'open about us success');
    test.assertExists('a[href="index.html"]', 'found link home');
  });
  casper.then(function(){
    this.click('a[href="index.html"]');
  });
  casper.then(function(){
    test.assertTitle('Neukinnis', 'open home success');
  });
  casper.thenOpen('http://localhost/neukinnis/client/aboutus.html').then(function(){
    test.assertTitle('About Us', 'return to about us');
    test.assertExists('a[href="privacy.html"]', 'found link privacy');
  });
  casper.then(function(){
    this.click('a[href="privacy.html"]');
  });
  casper.then(function(){
    test.assertTitle('Privacy', 'open privacy success');
  });
  casper.thenOpen('http://localhost/neukinnis/client/aboutus.html').then(function(){
    test.assertTitle('About Us', 'return to about us');
    test.assertExists('a[href="contactus.html"]', 'found link contactus');
  });
  casper.then(function(){
    this.click('a[href="contactus.html"]');
  });
  casper.then(function(){
    test.assertTitle('Contact Us', 'open contact us success');
  });
  casper.thenOpen('http://localhost/neukinnis/client/aboutus.html').then(function(){
    test.assertTitle('About Us', 'return to about us');
    test.assertExists('a[href="courses.html"]', 'found link courses');
  });
  casper.then(function(){
    this.click('a[href="courses.html"]');
  });
  casper.then(function(){
    test.assertTitle('Courses', 'open courses success');
  });
  casper.thenOpen('http://localhost/neukinnis/client/aboutus.html').then(function(){
    test.assertTitle('About Us', 'return to about us');
    test.assertExists('a[href="instructors.html"]', 'found instructors link');
  });
  casper.then(function(){
    this.click('a[href="instructors.html"]');
  });
  casper.then(function(){
    test.assertTitle('Instructors', 'open instructors success');
  });
  casper.run(function(){
    test.done();
  });
});