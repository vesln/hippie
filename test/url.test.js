describe('#url', function() {
  it('sets the request url, respects base', function(done) {
    api()
    .url('/get')
    .method('GET')
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq('GET');
      done();
    });
  });
});
