//test-name.spec.js

/* global casper */

casper.test.begin('page 1 navigates to page 2', 3,
  function suite(test){
  });

casper.start('http://localhost:3000/contact.html', function(){
  test.assertTitle('Page 1', 'page 1 title good');
  test.assertExists('.testedlink', 'link found');
});
casper.then(function(){
  this.click('.testedlink');
});
casper.then(function(){
  test.assertTitle('Page 2', 'page 2 title good');
});
casper.run(function(){
  test.done();
});
