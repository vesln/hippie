/**
 * External dependencies.
 */

var chai = require('chai');

/**
 * Internal dependencies.
 */

var server = require('./server');

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

server.listen(server.PORT);
