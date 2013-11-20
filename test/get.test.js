describe('#get', function() {
  it('performs a GET request', function(done) {
    api()
    .get('http://localhost:7891/get')
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq('GET');
      done();
    });
  });

  it('can perform the test without calling `end`', function(done) {
    api()
    .get('http://localhost:7891/get', function(err, res) {
      should.not.exist(err);
      res.body.should.eq('GET');
      done();
    });
  });
});
