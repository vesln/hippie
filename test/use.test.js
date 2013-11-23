describe('#use', function() {
  it('registers a new middleware', function(done) {
    var actual = '';

    api()
    .use(function(options, next) {
      options.method.should.eq('GET');
      actual += '1';
      next(options);
    })
    .use(function(options, next) {
      actual += '2';
      next(options);
    })
    .get('/method', function(err, res) {
      should.not.exist(err);
      actual.should.eq('12');
      done();
    });
  });
});
