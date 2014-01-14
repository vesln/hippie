/**
 * Parse JSON.
 *
 * @param {Object} data - if empty(eg: HTTP 204, HTTP 304) then not parsed
 * @param {Function} fn
 * @api public
 */

exports.json = function(data, fn) {
  var res = null;
  var err = null;

  if (data) {
    try {
      res = JSON.parse(data);
    } catch (e) {
      err = e;
    }
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
