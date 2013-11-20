describe('#del', function() {
  it('performs a DELETE request', function(done) {
    api()
    .del('/del')
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq('DELETE');
      done();
    });
  });

  it('can perform the test without calling `end`', function(done) {
    api()
    .del('/del', function(err, res) {
      should.not.exist(err);
      res.body.should.eq('DELETE');
      done();
    });
  });
});
