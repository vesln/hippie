describe('#send', function() {
  it('sets the request body', function(done) {
    var data = { foo: 'bar' };

    api()
    .send(data)
    .post('/send-form')
    .end(function(err, res) {
      res.body.should.eq(JSON.stringify(data));
      done();
    });
  });
});
