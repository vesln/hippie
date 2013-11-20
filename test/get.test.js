describe('#get', function() {
  it('performs a GET request', function(done) {
    api()
    .get('http://localhost:7891/get')
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq('GET');
      done();
    });
  });
});
