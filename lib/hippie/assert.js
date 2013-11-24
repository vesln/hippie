/**
 * Core dependencies.
 */

var inspect = require('util').inspect;

/**
 * External dependencies.
 */

var AssertionError = require('assertion-error');
var eql = require('deep-eql');

/**
 * Check if `actual` === `expected` and if not
 * return a new `AssertionError`.
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {String} message
 * @api private
 */

function assert(actual, expected, message) {
  if (toString.call(expected) === '[object RegExp]' && expected.test(actual)) {
    return;
  } else if (eql(actual, expected)) {
    return;
  }

  var pad = Array(5).join(' ');
  var msg = message + '\n\n'
    + pad + 'Actual:   ' + inspect(actual) + '\n'
    + pad + 'Expected: ' + inspect(expected) + '\n';

  return new AssertionError(msg, {
    actual: actual,
    expected: expected,
    showDiff: assert.showDiff
  });
}

/**
 * Primary export.
 */

module.exports = assert;
