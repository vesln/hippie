describe('#send', function() {
  it('sets the request body', function(done) {
    var data = { foo: 'bar' };

    api()
    .form()
    .send(data)
    .post('/send-form')
    .end(function(err, res) {
      var body = JSON.parse(res.body);

      should.not.exist(err);
      body.foo.should.eq(data.foo);

      done();
    });
  });
});
