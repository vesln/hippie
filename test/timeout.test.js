describe('#timeout', function() {
  it('sets request timeout', function(done) {
    api()
    .timeout(1)
    .get('/slow', function(err, res) {
      err.code.should.eq('ETIMEDOUT');
      done();
    });
  });
});
