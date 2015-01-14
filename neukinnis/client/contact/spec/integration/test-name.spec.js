//test-name.spec.js
/*
Acceptance Criteria:
I can:
-Navigate to this page according to the site map url
-See that the page looks like the mockup
-View the page at different resolutions and the content is laid out logically
*/

/* global casper */


casper.test.begin('contact page navigates to home page ', 3,
  function suite(test){
  });

//casper.start('http://localhost:3000/contact.html', function(){
casper.start('http://localhost:63342/fullstack-project-01/neukinnis/client/contact/contact.html', function(){
  test.assertTitle('Contact Us', 'contact us page  title good');
  test.assertExists('.testedlink', 'link found');
});
casper.then(function(){
  this.click('.testedlink');
});
casper.then(function(){
  test.assertTitle('Home', 'home page title good');
});
casper.run(function(){
  test.done();
});
