describe('#put', function() {
  it('performs a PUT request', function(done) {
    api()
    .put('/method')
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq('PUT');
      done();
    });
  });

  it('can perform the test without calling `end`', function(done) {
    api()
    .put('/method', function(err, res) {
      should.not.exist(err);
      res.body.should.eq('PUT');
      done();
    });
  });
});
