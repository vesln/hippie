/**
 * External dependencies.
 */

var request = require('request');

/**
 * Client.
 *
 * @constructor
 */

function Client() {
  if (!(this instanceof Client)) {
    return new Client;
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
 * @returns {Client} self
 * @api public
 */

Client.prototype.timeout = function(time) {
  this.options.timeout = time;
  return this;
};

/**
 * Set an object containing the query string values.
 *
 * @param {Object} obj
 * @returns {Client} self
 * @api public
 */

Client.prototype.qs = function(obj) {
  this.options.qs = obj;
  return this;
};

/**
 * Set base URL.
 *
 * @param {String} url
 * @returns {Client} self
 * @api public
 */

Client.prototype.base = function(url) {
  this._base = url;
  return this;
};

/**
 * Set URL.
 *
 * @param {String} url
 * @returns {Client} self
 * @api public
 */

Client.prototype.url = function(url) {
  this._url = url;
  return this;
};

/**
 * Set a header.
 *
 * @param {String} key
 * @param {String} value
 * @returns {Client} self
 * @api public
 */

Client.prototype.header = function(key, val) {
  this.options.headers[key] = val;
  return this;
};

/**
 * Set HTTP method.
 *
 * @param {String} method
 * @returns {Client} self
 * @api public
 */

Client.prototype.method = function(method) {
  this.options.method = method;
  return this;
};

/**
 * Sugar syntax for `method`, `url` and `end`.
 *
 * @see Client#method
 * @see Client#url
 * @see Client#end
 */

[
  'GET',
  'POST',
  'DELETE',
  'PUT',
  'PATCH'
].forEach(function(method) {
  var key = method === 'DELETE' ? 'del' : method.toLowerCase();

  Client.prototype[key] = function(url, fn) {
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

Client.prototype.end = function(fn) {
  this.options.url = this._base + this._url;
  request(this.options, fn);
};

/**
 * Primary export.
 */

module.exports = Client;
