var server = require('./server');
var dataSource = server.dataSources.fullstack;
var Contact = server.models.contact;
var contacts = [
  { name: 'foo@bar.com'
  }, {
    name: 'bar@bar.com'
  } ];

var count = contacts.length;
dataSource.automigrate('contact', function(er) {
  if (er) throw er;
  contacts.forEach(function(contact) {
    Contact.create(contact, function(er, result) {
      if (er) return;
      console.log('Record created:', result);
      count--;
      if(count === 0) {
        console.log('done');
        dataSource.disconnect();
      }
    });
  });
});
