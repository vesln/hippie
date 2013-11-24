describe('#expectStatusCode', function() {
  it('return an error when the expected status code does not match the actual', function(done) {
    api()
    .expectStatusCode(201)
    .get('/method', function(err) {
      err.should.be.ok;
      done();
    });
  });

  it('does not return an error when the expected status code matches the actual', function(done) {
    api()
    .expectStatusCode(200)
    .get('/method', done);
  });

  it('has aliases', function() {
    var client = api();
    client.expectStatusCode.should.eq(client.expectStatus);
    client.expectStatusCode.should.eq(client.expectCode);
  });
});
