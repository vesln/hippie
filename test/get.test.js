describe('#get', function() {
  it('performs a GET request', function(done) {
    api()
    .get('/method')
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq('GET');
      done();
    });
  });

  it('can perform the test without calling `end`', function(done) {
    api()
    .get('/method', function(err, res) {
      should.not.exist(err);
      res.body.should.eq('GET');
      done();
    });
  });
});
