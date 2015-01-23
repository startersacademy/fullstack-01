//jeff-aboutus.spec.js

/* global casper */

casper.test.begin('About Us - Navigation Test', function suite(test){
  casper.start('http://localhost:3000/aboutus.html', function(){
    test.assertTitle('About Us', 'Finds page title ' + this.getTitle());
    test.assertExists('a[href="/index.html"]', 'Checks existence of link to Home page');
  });
  casper.then(function(){
    this.click('a[href="/index.html"]');
  });
  casper.then(function(){
    test.assertTitle('Neukinnis', 'Finds page title ' + this.getTitle());
    this.back();
  });
<<<<<<< HEAD
  // casper.then(function(){
  //   test.assertTitle('About Us', 'Returns to page ' + this.getTitle());
  //   test.assertExists('a[href="/privacy.html"]', 'Check existence of link to Privacy page');
  // });
  // casper.then(function(){
  //   this.click('a[href="/privacy.html"]');
  // });
  // casper.then(function(){
  //   test.assertTitle('Privacy', 'Finds page title ' + this.getTitle());
  //   this.back();
  // });
=======
>>>>>>> d2bd03a... removes commented out code
  casper.then(function(){
    test.assertTitle('About Us', 'Returns to page ' + this.getTitle());
    test.assertExists('a[href="/courses.html"]', 'Check existence of link to Courses page');
  });
  casper.then(function(){
    this.click('a[href="/courses.html"]');
  });
  casper.then(function(){
    test.assertTitle('About the Courses', 'Finds page title ' + this.getTitle());
    this.back();
  });
  casper.then(function(){
    test.assertTitle('About Us', 'Returns to page ' + this.getTitle());
    test.assertExists('a[href="/contactus.html"]', 'Check existence of link to Contact page');
  });
  casper.then(function(){
    this.click('a[href="/contactus.html"]');
  });
  casper.then(function(){
    test.assertTitle('Contact Us', 'Finds page title ' + this.getTitle());
    this.back();
  });
  casper.then(function(){
    test.assertTitle('About Us', 'Returns to page ' + this.getTitle());
    test.assertExists('a[href="/instructors.html"]');
  });
  casper.then(function(){
    this.click('a[href="/instructors.html"]');
  });
  casper.then(function(){
    test.assertTitle('About Instructors', 'Finds page title ' + this.getTitle());
    this.back();
  });
  casper.then(function(){
    test.assertTitle('About Us', 'Returns to page ' + this.getTitle());
  });
  casper.run(function(){
    test.done();
    console.log("This test has finished.")
  });
});
