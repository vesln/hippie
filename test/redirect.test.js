describe('redirects', function() {
  it('does not follow HTTP redirects by default', function(done) {
    api()
    .json()
    .get('/redirect')
    .expectStatus(302)
    .end(done);
  });
});
