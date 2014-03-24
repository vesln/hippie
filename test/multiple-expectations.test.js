describe('multiple expectations', function() {
  it('works as expected', function(done) {
    api()
    .json()
    .get('/list')
    .expectValue('[0].id', 4)
    .expectStatus(200)
    .end(done);
  });
});
