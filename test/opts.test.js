describe('#opts', function() {
  it('yields the options for the HTTP client', function(done) {
    var called = false;

    api()
    .patch('/method')
    .opts(function(options) {
      options.method.should.eq('PATCH');
      called = true;
    })
    .end(function() {
      called.should.be.true;
      done();
    });
  });
});
