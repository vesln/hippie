/**
 * External dependencies.
 */

var app = require('express')();

app.get('/get', function(req, res) {
  res.send('GET');
});

app.post('/post', function(req, res) {
  res.send('POST');
});

app.del('/del', function(req, res) {
  res.send('DELETE');
});

app.put('/put', function(req, res) {
  res.send('PUT');
});

app.patch('/patch', function(req, res) {
  res.send('PATCH');
});

app.get('/header', function(req, res) {
  res.send(req.header('x-custom'));
});

/**
 * Primary export.
 */

module.exports = app;

/**
 * Export the configured port.
 */

module.exports.PORT = process.env.HIPPIE_PORT || 7891;
