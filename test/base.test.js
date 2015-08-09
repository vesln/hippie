var hippie = require('..');
var server = require('./support/server');

describe('#base', function() {
  it('sets a base url', function(done) {
    hippie()
    .base('http://localhost:' + server.PORT)
    .get('/method')
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq('GET');
      done();
    });
  });

  it('uses the base url by default', function(done) {
    api()
    .end(function(err, res) {
      res.request.uri.href.should.eq('http://localhost:' + server.PORT + '/');
      should.not.exist(err);
      done();
    });
  });
});
