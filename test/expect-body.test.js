describe('#expectBody', function() {
  describe('with strings', function() {
    it('does not return an error when the expectation is fulfilled', function(done) {
      api()
      .get('/method')
      .expectBody('GET')
      .end(done);
    });

    it('returns an error when the expectation is not fulfilled', function(done) {
      api()
      .get('/method')
      .expectBody('POST')
      .end(function(err) {
        err.should.be.ok;
        done();
      });
    });
  });

  describe('with regular expressions', function() {
    it('does not return an error when the expectation is fulfilled', function(done) {
      api()
      .get('/method')
      .expectBody(/GET/)
      .end(done);
    });

    it('returns an error when the expectation is not fulfilled', function(done) {
      api()
      .get('/method')
      .expectBody(/POST/)
      .end(function(err) {
        err.should.be.ok;
        done();
      });
    });
  });

  describe('with arrays', function() {
    it('does not return an error when the expectation is fulfilled', function(done) {
      api()
      .json()
      .get('/list')
      .expectBody([{ id: 4 }])
      .end(done);
    });

    it('returns an error when the expectation is not fulfilled', function(done) {
      api()
      .json()
      .get('/list')
      .expectBody([{ id: 5 }])
      .end(function(err) {
        err.should.be.ok;
        done();
      });
    });
  });

  describe('with objects', function() {
    it('does not return an error when the expectation is fulfilled', function(done) {
      api()
      .json()
      .get('/user')
      .expectBody({ id: 4 })
      .end(done);
    });

    it('returns an error when the expectation is not fulfilled', function(done) {
      api()
      .json()
      .get('/list')
      .expectBody({ id: 5 })
      .end(function(err) {
        err.should.be.ok;
        done();
      });
    });
  });
});
