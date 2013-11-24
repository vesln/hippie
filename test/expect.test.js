describe('#expect', function() {
  it('registers a new expectation', function(done) {
    var called = false;

    api()
    .expect(function(err, res, body, next) {
      called = true;
      next();
    })
    .get('/method', function() {
      called.should.be.true;
      done();
    });
  });
});
