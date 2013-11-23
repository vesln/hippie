describe('#qs', function() {
  it('sets a query string', function(done) {
    var qs = { foo: 'bar', baz: 'boo' };

    api()
    .get('/qs')
    .qs(qs)
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq(JSON.stringify(qs));
      done();
    });
  });
});
