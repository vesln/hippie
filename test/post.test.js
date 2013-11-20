describe('#post', function() {
  it('performs a POST request', function(done) {
    api()
    .post('/method')
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq('POST');
      done();
    });
  });

  it('can perform the test without calling `end`', function(done) {
    api()
    .post('/method', function(err, res) {
      should.not.exist(err);
      res.body.should.eq('POST');
      done();
    });
  });
});
