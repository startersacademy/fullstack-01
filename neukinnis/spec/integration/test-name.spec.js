//test-name.spec.js
/*
Acceptance Criteria:
I can:
-Navigate to this page according to the site map url
-See that the page looks like the mockup
-View the page at different resolutions and the content is laid out logically
*/

/* global casper */


casper.test.begin('Contact page navigates to home page ', 2,
  function suite(test) {
    casper.start('http://localhost:3000/contact.html', function () {
      test.assertTitle('Contact Us', 'contact us page title good');
      test.assertExists('a[href="index.html"]', 'link found');
    });

    //casper.start('http://localhost:3000/contact.html', function(){

    casper.then(function () {
      this.click('a[href="index.html"]');
    });
    casper.run(function () {
      test.done();
    });
  });
