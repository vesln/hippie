var hippie = require('..');
var server = require('./support/server');

describe('#base', function() {
  it('sets a base url', function(done) {
    hippie()
    .base('http://localhost:' + server.PORT)
    .get('/get')
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq('GET');
      done();
    });
  });
});
