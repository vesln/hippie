/**
 * External dependencies.
 */

var express = require('express');
var basicAuth = require('basic-auth-connect');
var bodyParser = require('body-parser');

/**
 * Server.
 */

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

app.post('/send-form', bodyParser.urlencoded({ extended: false }), function(req, res) {
  res.send(JSON.stringify(req.body));
});

app.post('/send-json', bodyParser.json(), function(req, res) {
  res.send(JSON.stringify(req.body));
});

app.get('/empty-response', function(req, res) {
  res.sendStatus(204);
});

app.get('/redirect', function(req, res) {
  res.redirect('/list');
});

app.get('/auth', basicAuth('user', 'pass'), function(req, res) {
  res.send('ok');
});

app.get('/list', function(req, res) {
  res.json([{ id: 4 }]);
});

app.get('/keys', function(req, res) {
  res.json({ hippie: 'cool', blank: '', nullable: null, boolean: false });
});

app.get('/user', function(req, res) {
  res.json({ id: 4 });
});

/**
 * Primary export.
 */

module.exports = app;

/**
 * Export the configured port.
 */

module.exports.PORT = process.env.HIPPIE_PORT || 7891;
