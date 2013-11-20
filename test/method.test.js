describe('#method', function() {
  it('sets the HTTP method', function(done) {
    api()
    .method('GET')
    .url('/get')
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq('GET');
      done();
    });
  });
});
