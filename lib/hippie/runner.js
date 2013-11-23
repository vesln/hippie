/**
 * External dependencies.
 */

var client = require('request');

/**
 * Runner.
 *
 * @constructor
 */

function Runner() {
  if (!(this instanceof Runner)) {
    return new Runner;
  }

  this._base = '';
  this.options = {
    method: 'GET',
    headers: {}
  };
}

/**
 * Set request timeout.
 *
 * @param {Number} time
 * @returns {Runner} self
 * @api public
 */

Runner.prototype.timeout = function(time) {
  this.options.timeout = time;
  return this;
};

/**
 * Set an object containing the query string values.
 *
 * @param {Object} obj
 * @returns {Runner} self
 * @api public
 */

Runner.prototype.qs = function(obj) {
  this.options.qs = obj;
  return this;
};

/**
 * Set base URL.
 *
 * @param {String} url
 * @returns {Runner} self
 * @api public
 */

Runner.prototype.base = function(url) {
  this._base = url;
  return this;
};

/**
 * Set URL.
 *
 * @param {String} url
 * @returns {Runner} self
 * @api public
 */

Runner.prototype.url = function(url) {
  this._url = url;
  return this;
};

/**
 * Set a header.
 *
 * @param {String} key
 * @param {String} value
 * @returns {Runner} self
 * @api public
 */

Runner.prototype.header = function(key, val) {
  this.options.headers[key] = val;
  return this;
};

/**
 * Set HTTP method.
 *
 * @param {String} method
 * @returns {Runner} self
 * @api public
 */

Runner.prototype.method = function(method) {
  this.options.method = method;
  return this;
};

/**
 * Sugar syntax for `method`, `url` and `end`.
 *
 * @see Runner#method
 * @see Runner#url
 * @see Runner#end
 */

[
  'GET',
  'POST',
  'DELETE',
  'PUT',
  'PATCH'
].forEach(function(method) {
  var key = method === 'DELETE' ? 'del' : method.toLowerCase();

  Runner.prototype[key] = function(url, fn) {
    this.method(method);
    this.url(url);
    if (fn) this.end(fn);
    return this;
  };
});

/**
 * Perform the test.
 *
 * @param {Function} fn
 * @api public
 */

Runner.prototype.end = function(fn) {
  this.options.url = this._base + this._url;
  client(this.options, fn);
};

/**
 * Primary export.
 */

module.exports = Runner;
