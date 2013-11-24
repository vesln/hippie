/**
 * External dependencies.
 */

var qs = require('qs');

/**
 * Convert object to qs.
 *
 * @param {Object} data
 * @param {Function} fn
 * @api public
 */

exports.urlencoded = function(data, fn) {
  fn(null, qs.stringify(data).toString('utf8'));
};

/**
 * Convert object to JSON.
 *
 * @param {Object} data
 * @param {Function} fn
 * @api public
 */

exports.json = function(data, fn) {
  fn(null, JSON.stringify(data));
};

/**
 * Noop serializer.
 *
 * @param {String} data
 * @param {Function} fn
 * @api public
 */

exports.raw = function(data, fn) {
  fn(null, data);
};
