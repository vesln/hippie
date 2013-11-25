var api = require('../');
var assert = require('assert');

api()
.json()
.get('https://api.github.com/users/vesln')
.expectStatus(200)
.expectValue('login', 'vesln')
.end(function(err, res, body) {
  if (err) throw err;
});
