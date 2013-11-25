/**
 * External dependencies.
 */

var express = require('express');
var app = express();

app.get('/users/vesln', function(req, res) {
  res.json({
    username: 'vesln',
    repos: [
      { name: 'jsmd' },
      { name: 'hippie' },
    ]
  });
});

module.exports = app;
