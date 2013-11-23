describe('#auth', function() {
  it('sets basic auth credentials', function(done) {
    api()
    .auth('user', 'pass')
    .get('/auth', function(err, res) {
      res.statusCode.should.eq(200);
      done();
    });
  });
});
