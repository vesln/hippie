describe('#expectValue', function() {
  it('returns an error when the expected value doesnt match the actual', function(done) {
    api()
    .json()
    .get('/list')
    .expectValue('[0].id', 3)
    .end(function(err) {
      err.should.be.ok;
      done();
    });
  });

  it('does not return an error when expected matches actual', function(done) {
    api()
    .json()
    .get('/list')
    .expectValue('[0].id', 4)
    .end(done);
  });
});
