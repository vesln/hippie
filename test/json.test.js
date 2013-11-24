describe('#json', function() {
  it('sets the content-type and accept headers to json', function(done) {
    api()
    .json()
    .opts(function(options) {
      options.headers['Content-Type'].should.eq('application/json; charset=utf-8');
      options.headers['Accept'].should.eq('application/json');
      done();
    });
  });

  it('converts the data to JSON', function(done) {
    var data = { foo: 'bar' };

    api()
    .json()
    .post('/send-json')
    .send(data)
    .end(function(err, res) {
      res.body.should.eq(JSON.stringify(data));
      done();
    });
  });

  it('works fine when there is no data', function(done) {
    api()
    .json()
    .post('/send-json')
    .end(done);
  });

  it('returns an error when the returned json is invalid', function(done) {
    api()
    .json()
    .post('/invalid')
    .end(function(err) {
      err.should.be.ok;
      done();
    });
  });
});
