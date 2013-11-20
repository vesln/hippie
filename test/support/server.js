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

/**
 * Primary export.
 */

module.exports = app;

/**
 * Export the configured port.
 */

module.exports.PORT = process.env.HIPPIE_PORT || 7891;
