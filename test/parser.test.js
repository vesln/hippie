describe('#parser', function() {
  it('configures response body parser', function(done) {
    var payload = { bar: 'baz' };

    api()
    .json()
    .parser(function(data, fn) {
      data.should.eq(JSON.stringify(payload));
      fn(null, { parsed: 'bar' });
    })
    .send(payload)
    .post('/send-json', function(err, res, body) {
      body.should.eql({ parsed: 'bar' });
      done();
    });
  });
});
