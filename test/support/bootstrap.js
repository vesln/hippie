/**
 * External dependencies.
 */

var chai = require('chai');

/**
 * Register `should`.
 */

global.should = chai.should();

/**
 * Include stack traces.
 */

chai.Assertion.includeStack = true;
