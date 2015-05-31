describe('#timeout', function() {
  it('use request time', function(done) {
    api()
    .time(true)
    .get('/method', function(err, res) {
      should.exist(res.elapsedTime);
      done();
    });
  });

  it('use request without time param', function(done) {
    api()
    .get('/method', function(err, res) {
      should.not.exist(res.elapsedTime);
      done();
    });
  });
});
