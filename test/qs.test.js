describe('#qs', function() {
  it('sets a query string', function(done) {
    var qs = { foo: 'bar', baz: 'boo' };

    api()
    .get('/qs')
    .qs(qs)
    .end(function(err, res) {
      var body = JSON.parse(res.body);

      should.not.exist(err);
      body.foo.should.eq(qs.foo);
      body.baz.should.eq(qs.baz);

      done();
    });
  });
});
