/* global casper */

casper.test.begin('foo navigates to bar', 3, function suite(test){

  var link = 'a[href=\'/bar.html\']';

  casper.start('http://localhost:3000/foo.html', function(){
    test.assertTitle('Foo', 'title is the one expected');
    test.assertExists(link, 'link to foo is found');
  });

  casper.then(function(){
    this.click(link);
  });

  casper.then(function(){
    test.assertTitle('Bar', 'bar title is the one expected');
  });

  casper.run(function(){
    test.done();
  });

});
