/**
 * External dependencies.
 */

var qs = require('qs');

/**
 * Convert object to qs.
 *
 * @param {Object} data
 * @returns {String}
 * @api public
 */

exports.form = function(data) {
  return qs.stringify(data).toString('utf8');
};

/**
 * Convert object to JSON.
 *
 * @param {Object} data
 * @returns {String}
 * @api public
 */

exports.json = function(data) {
  return JSON.stringify(data);
};
