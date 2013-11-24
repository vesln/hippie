var hippie = require('..');

describe('#end', function() {
  it('returns connection errors', function(done) {
    hippie()
    .get('http://invalid.z', function(err) {
      err.should.be.ok;
      done();
    });
  });

  it('returns parser errors', function(done) {
    var error = new Error('Parsing error');

    api()
    .parser(function(_, end) {
      end(error);
    })
    .get('/method', function(err) {
      err.should.eql(error);
      done();
    });
  });

  it('returns serializer errors', function(done) {
    var error = new Error('Serializing error');

    api()
    .send({ foo: 'bar' })
    .serializer(function(_, end) {
      end(error);
    })
    .post('/method', function(err) {
      err.should.eql(error);
      done();
    });
  });
});
