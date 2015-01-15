/**
 * Created by rauldablaing on 1/13/15.
 */

casper.test.begin('homepage test', 6,
  function suite(test){
    casper.start('http://localhost:3000/index.html', function(){
      test.assertTitle('Neukinnis', 'Page title good');
      test.assertExists('a[href="courses.html"]', 'courses link found');
      test.assertExists('a[href="instructors.html"]', 'instructors link found');
      test.assertExists('a[href="about.html"]', 'about link found');
      test.assertExists('a[href="contact.html"]', 'contact link found');
      test.assertExists('a[href="tel:524-469-4891"]', 'phonenumber link found and correct');
    });
    casper.run(function(){
      test.done();
    });
  });
