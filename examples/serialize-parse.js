var api = require('../');
var xml = require('my-xml-library');

api()
.serializer(function(params, fn) {
  var err = new Error('Things went wrong');
  var res = xml.objectToXml(params);
  fn(err, res);
})
.parser(function(body, fn) {
  var err = new Error('Things went wrong');
  var res = xml.xmlToObject(body);
  fn(err, res);
})
.get('https://api.github.com/users/vesln.xml')
.expectStatus(200)
.end(function(err, res, body) {
  if (err) throw err;
});
