/* global casper */

casper.test.begin('page 1 navigates to page 2', 3, function suite(test){

  var link = 'a[href=\'/page2.html\']';

  casper.start('http://localhost:3000/page1.html', function(){
    test.assertTitle('Page 1', 'page 1 title is the one expected');
    test.assertExists(link, 'link to page 2 is found');
  });

  casper.then(function(){
    this.click(link);
  });

  casper.then(function(){
    test.assertTitle('Page 2', 'page 2 title is the one expected');
  });

  casper.run(function(){
    test.done();
  });

});
