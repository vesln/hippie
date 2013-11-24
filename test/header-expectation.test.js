describe('#expectHeader', function() {
  it('return an error when the expected header does not match the actual', function(done) {
    api()
    .expectHeader('Content-Type', 'application/json')
    .get('/method', function(err) {
      err.should.be.ok;
      done();
    });
  });

  it('does not return an error when the expected status code matches the actual', function(done) {
    api()
    .expectHeader('Content-Type', 'text/html; charset=utf-8')
    .get('/method', done);
  });
});
