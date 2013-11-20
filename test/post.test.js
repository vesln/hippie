describe('#post', function() {
  it('performs a POST request', function(done) {
    api()
    .post('/post')
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq('POST');
      done();
    });
  });

  it('can perform the test without calling `end`', function(done) {
    api()
    .post('/post', function(err, res) {
      should.not.exist(err);
      res.body.should.eq('POST');
      done();
    });
  });
});
