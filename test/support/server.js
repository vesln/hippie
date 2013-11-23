/**
 * External dependencies.
 */

var express = require('express');

var app = express();
app.use(express.json());
app.use(express.urlencoded());

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

app.post('/send-form', function(req, res) {
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
