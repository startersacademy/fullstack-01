//test-name.spec.js

/* global casper */

casper.test.begin('page 1 navigates to page 2', 2,
  function suite(test){
    casper.start('http://localhost:3000/about.html', function(){
      test.assertTitle('About Instructors', 'About Instructors title good');
      test.assertExists('index.html', ' index link found');
      test.assertExists('instructors.html', ' instructors link found');
      test.assertExists('contact.html', ' contact link found');
      test.assertExists('services.html', '  link found');
      test.assertExists('about.html', ' index link found');

    });
    /*casper.then(function(){
      this.click('.testedlink');
    });
    casper.then(function(){
      test.assertTitle('Page 2', 'page 2 title good');
    });*/
    casper.run(function(){
      test.done();
    });
  });
