/**
 * External dependencies.
 */

var app = require('express')();

app.all('/method', function(req, res) {
  res.send(req.method);
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
