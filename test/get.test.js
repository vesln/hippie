describe('#get', function() {
  it('performs a GET request', function(done) {
    api()
    .get('/get')
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq('GET');
      done();
    });
  });

  it('can perform the test without calling `end`', function(done) {
    api()
    .get('/get', function(err, res) {
      should.not.exist(err);
      res.body.should.eq('GET');
      done();
    });
  });
});
