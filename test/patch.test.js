describe('#patch', function() {
  it('performs a PATCH request', function(done) {
    api()
    .patch('/method')
    .end(function(err, res) {
      should.not.exist(err);
      res.body.should.eq('PATCH');
      done();
    });
  });

  it('can perform the test without calling `end`', function(done) {
    api()
    .patch('/method', function(err, res) {
      should.not.exist(err);
      res.body.should.eq('PATCH');
      done();
    });
  });
});
