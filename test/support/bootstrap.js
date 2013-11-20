/**
 * External dependencies.
 */

var chai = require('chai');

/**
 * Internal dependencies.
 */

var server = require('./server');

/**
 * Port for the test server.
 */

var port = process.env.HIPPIE_PORT || 7891;

/**
 * Register `should`.
 */

global.should = chai.should();

/**
 * Export `api`.
 */

global.api = require('../..');

/**
 * Include stack traces.
 */

chai.Assertion.includeStack = true;

/**
 * Fire up the HTTP server.
 */

server.listen(port);
