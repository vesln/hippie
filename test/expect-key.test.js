
describe('#expectKey', function() {
  it('returns an error when the key is missing from the response', function(done) {
    api()
    .json()
    .get('/keys')
    .expectKey('non_existing')
    .end(function(err) {
      err.should.be.ok;
      done();
    });
  });

  it('does not return an error when the key is present', function(done) {
    api()
    .json()
    .get('/keys')
    .expectKey('hippie')
    .end(done);
  });

  it('should work with falsy values if key is present', function(done) {
    api()
    .json()
    .get('/keys')
    .expectKey('blank')
    .expectKey('nullable')
    .expectKey('boolean')
    .end(done);
  });
});
