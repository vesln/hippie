/**
 * External dependencies.
 */

var express = require('express');

var app = express();

app.all('/method', function(req, res) {
  res.send(req.method);
});

app.get('/header', function(req, res) {
  res.send(req.header('x-custom'));
});

app.get('/qs', function(req, res) {
  res.send(JSON.stringify(req.query));
});

app.get('/slow', function() {});

app.post('/send-form', [express.urlencoded()], function(req, res) {
  res.send(JSON.stringify(req.body));
});

app.post('/send-json', [express.json()], function(req, res) {
  res.send(JSON.stringify(req.body));
});

/**
 * Primary export.
 */

module.exports = app;

/**
 * Export the configured port.
 */

module.exports.PORT = process.env.HIPPIE_PORT || 7891;
