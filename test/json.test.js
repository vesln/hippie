describe('#json', function() {
  it('sets the content-type and accept headers to json', function(done) {
    api()
    .json()
    .opts(function(options) {
      options.headers['Content-Type'].should.eq('application/json');
      options.headers['Accept'].should.eq('application/json');
      done();
    });
  });
});
