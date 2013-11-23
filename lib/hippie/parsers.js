/**
 * Parse JSON.
 *
 * @param {Object} data
 * @param {Function} fn
 * @api public
 */

exports.json = function(data, fn) {
  var res = null;
  var err = null;

  try {
    res = JSON.parse(data);
  } catch (e) {
    err = e;
  }

  fn(err, res);
};

/**
 * Noop parser.
 *
 * @param {String} data
 * @param {Function} fn
 * @api public
 */

exports.raw = function(data, fn) {
  fn(null, data);
};
