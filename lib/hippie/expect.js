/**
 * External dependencies.
 */

var pathval = require('pathval');

/**
 * Internal dependencies.
 */

var assert = require('./assert');

/**
 * Return a status code expectation.
 *
 * @param {Number} expected status code
 * @returns {Function}
 * @api public
 */

exports.statusCode = function(code) {
  return function statusCode(res, body, next) {
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
  return function header(res, body, next) {
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
  return function value(res, body, next) {
    next(assert(pathval.getPathValue(body, key), val, 'Value - ' + key));
  };
};

/**
 * Return a key expectation.
 *
 * @param {String} string path
 * @returns {Function}
 * @api public
 */

exports.keyCheck = function(keyParam) {
  return function keyCheck(res, body, next) {
    var value = pathval.getPathValue(body, keyParam);
    var notUndefined = typeof value !== 'undefined';
    next(assert(notUndefined, true, 'Key - ' + keyParam));
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
  return function value(res, body, next) {
    var actual = res.body;

    if (Array.isArray(expected)) {
      actual = body;
    } else if (Object(expected) === expected && !isRegexp(expected)) {
      actual = body;
    }

    next(assert(actual, expected, 'Body'));
  };
};

function isRegexp(input) {
  return toString.call(input) === '[object RegExp]';
}
