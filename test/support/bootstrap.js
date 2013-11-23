/**
 * External dependencies.
 */

var chai = require('chai');

/**
 * Internal dependencies.
 */

var server = require('./server');
var hippie = require('../..');

/**
 * Register `should`.
 */

global.should = chai.should();

/**
 * Export `api`.
 */

global.api = function() {
  return hippie().base('http://localhost:' + server.PORT);
};

/**
 * Include stack traces.
 */

chai.Assertion.includeStack = true;

/**
 * Do not show diffs.
 */

chai.Assertion.showDiff = false;

/**
 * Fire up the HTTP server.
 */

server.listen(server.PORT);
