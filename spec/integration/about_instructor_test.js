//test-name.spec.js

/* global casper */

casper.test.begin('page 1 navigates to page 2', 1,
  function suite(test){
    casper.start('http://localhost:3000/aboutus.html', function(){
      test.assertTitle('About Us', 'About Instructors title good');

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
