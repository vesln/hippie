describe('#serializer', function() {
  it('configures the request body serializer', function(done) {
    api()
    .json()
    .serializer(function(data) {
      return JSON.stringify(data);
    })
    .send({ foo: 'bar' })
    .post('/send-json', done);
  });
});
