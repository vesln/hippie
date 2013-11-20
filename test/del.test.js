describe('#del', function() {
  it('performs a DELETE request', function(done) {
    api()
    .del('/method')
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq('DELETE');
      done();
    });
  });

  it('can perform the test without calling `end`', function(done) {
    api()
    .del('/method', function(err, res) {
      should.not.exist(err);
      res.body.should.eq('DELETE');
      done();
    });
  });
});
