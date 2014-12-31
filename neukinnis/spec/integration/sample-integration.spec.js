/* global casper */

casper.test.begin('page1 navigates to page2', 3, function suite(test){

  var link = 'a[href=/page2.html]';

  casper.start('http://localhost:5000/page1.html', function(){
    test.assertTitle('Page 1', 'page1 title is the one expected');
    test.assertExists(link, 'link to page2 is found');
  });

  casper.then(function(){
    this.click(link);
  });

  casper.then(function(){
    test.assertTitle('Page 2', 'page2 title is the one expected');
  });

  casper.run(function(){
    test.done();
  });

});
