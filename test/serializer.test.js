describe('#serializer', function() {
  it('configures the request body serializer', function(done) {
    api()
    .json()
    .serializer(function(data, fn) {
      fn(null, JSON.stringify(data));
    })
    .send({ foo: 'bar' })
    .post('/send-json', done);
  });
});
