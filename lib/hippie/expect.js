/**
 * External dependencies.
 */

var AssertionError = require('assertion-error');
var pathval = require('pathval');
var eql = require('deep-eql');

/**
 * Return a status code expectation.
 *
 * @param {Number} expected status code
 * @returns {Function}
 * @api public
 */

exports.statusCode = function(code) {
  return function statusCode(err, res, body, next) {
    next(assert(res.statusCode, code, 'Status code'));
  };
};

/**
 * Return a header expectation.
 *
 * @param {String} header
 * @param {String} value
 * @returns {Function}
 * @api public
 */

exports.header = function(key, val) {
  key = key.toLowerCase();
  return function header(err, res, body, next) {
    next(assert(res.headers[key], val, 'Header - ' + key));
  };
};

/**
 * Return a value expectation.
 *
 * @param {String} string path
 * @param {Mixed} value
 * @returns {Function}
 * @api public
 */

exports.value = function(key, val) {
  return function value(err, res, body, next) {
    next(assert(pathval(key, body), val, 'Value - ' + key));
  };
};

/**
 * Return a body expectation.
 *
 * @param {Mixed} expected
 * @returns {Function}
 * @api public
 */

exports.body = function(expected) {
  return function value(err, res, body, next) {
    var actual = Array.isArray(expected) || Object(expected) === expected
      ? body
      : res.body;

    next(assert(actual, expected, 'Body'));
  };
};

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

  var pad = Array(8).join(' ');
  var msg = message + '\n\n'
    + pad + 'Actual:   ' + actual + '\n'
    + pad + 'Expected: ' + expected + '\n';

  return new AssertionError(msg);
}
