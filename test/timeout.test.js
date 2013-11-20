describe('#timeout', function() {
  it('sets request timeout', function(done) {
    api()
    .timeout(1)
    .get('/slow', function(err, res) {
      err.should.be.ok;
      done();
    });
  });
});
