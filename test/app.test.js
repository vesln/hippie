var http = require('http');
var app = require('./support/server');
var hippie = require('../.');

describe('#app', function() {
  it('can configure express-like apps', function(done) {
    hippie(app)
    .expectStatus(200)
    .get('/method', done);
  });

  it('can configure already started servers', function(done) {
    var server = http.createServer(app);
    server.listen(0);

    hippie(server)
    .expectStatus(200)
    .get('/method', done);
  });

  it('can configure http handlers', function(done) {
    hippie(function(req, res) {
      res.end('Hi!\n');
    })
    .expectBody('Hi!\n')
    .get('/', done);
  });
});
