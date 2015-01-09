//test-name.spec.js

/* global casper */

casper.test.begin('About us page test', 3,
  function suite(test){
    casper.start('http://localhost/test/page1.html', function(){
    test.assertTitle('About Us', 'open about us success');
    test.assertExists('a[href="/home"]', 'found link home');
  });
  casper.then(function(){
    this.click('a[href="/home"]');
  });
  casper.then(function(){
    test.assertTitle('Neukinnis', 'open home success');
  });
  casper.thenOpen('http://localhost/test/page1.html').then(function(){
    test.assertTitle('About Us', 'return to about us');
    test.assertExists('a[href="/privacy"]', 'found link privacy');
  });
  casper.then(function(){
    this.click('a[href="/privacy"]');
  });
  casper.then(function(){
    test.assertTitle('Privacy', 'open privacy success');
  });
  casper.thenOpen('http://localhost/test/page1.html').then(function(){
    test.assertTitle('About Us', 'return to about us');
    test.assertExists('a[href="/contactus"]', 'found link contactus');
  });
  casper.then(function(){
    this.click('a[href="/contactus"]');
  });
  casper.then(function(){
    test.assertTitle('Contact Us', 'open contact us success');
  });
  casper.thenOpen('http://localhost/test/page1.html').then(function(){
    test.assertTitle('About Us', 'return to about us');
    test.assertExists('a[href="/courses"]', 'found link courses');
  });
  casper.then(function(){
    this.click('a[href="/courses"]');
  });
  casper.then(function(){
    test.assertTitle('Courses', 'open courses success');
  });
  casper.thenOpen('http://localhost/test/page1.html').then(function(){
    test.assertTitle('About Us', 'return to about us');
    test.assertExists('a[href="/instructors"]', 'found instructors link');
  });
  casper.then(function(){
    this.click('a[href="/instructors"]');
  });
  casper.then(function(){
    test.assertTitle('Instructors', 'open instructors success');
  });
  casper.run(function(){
    test.done();
  });
});