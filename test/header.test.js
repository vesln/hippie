describe('#header', function() {
  it('sets a header for the request', function(done) {
    api()
    .get('/header')
    .header('X-Custom', 'custom header')
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq('custom header');
      done();
    });
  });

  it('sets multiple headers for the request', function(done) {
    api()
    .get('/header')
    .headers({
      'X-Custom': 'custom header',
      'Y-Custom': 'another header',
    })
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq('custom header');
      done();
    });
  });
});
