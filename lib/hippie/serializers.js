/**
 * External dependencies.
 */

var qs = require('qs');

/**
 * Convert object to form-data
 *
 * @param {Object} data
 * @returns {String}
 * @api public
 */

exports.form = function(data) {
  return qs.stringify(data).toString('utf8');
};
