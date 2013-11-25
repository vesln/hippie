var app = require('./server');
app.listen(1234);

var api = require('../');

api()
.json()
.base('http://localhost:1234')
.get('/users/vesln')
.expectStatus(200)
.expectHeader('Content-Type', 'application/json; charset=utf-8')
.expectValue('username', 'vesln')
.expectValue('repos[0].name', 'jsmd')
.expectBody({
  username: 'vesln',
  repos: [
    { name: 'jsmd' },
    { name: 'hippie' },
  ]
})
.expectBody(/vesln/g)
.end(function(err, res, body) {
  if (err) throw err;
  process.exit(0);
});
