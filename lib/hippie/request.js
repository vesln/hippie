/**
 * External dependencies.
 */

var http = require('request');

/**
 * Request builder.
 *
 * @constructor
 */

function Request() {
  this._base = '';
  this.options = {
    method: 'GET',
    headers: {}
  };
}

/**
 * Set HTTP method.
 *
 * @param {String} method
 * @api public
 */

Request.prototype.method = function(method) {
  this.options.method = method;
};

/**
 * Set URL.
 *
 * @param {String} url
 * @api public
 */

Request.prototype.url = function(url) {
  this._url = url;
};

/**
 * Set base URL.
 *
 * @param {String} url
 * @api public
 */

Request.prototype.base = function(url) {
  this._base = url;
};

/**
 * Set a header.
 *
 * @param {String} key
 * @param {String} value
 * @api public
 */

Request.prototype.header = function(key, val) {
  this.options.headers[key] = val;
};

/**
 * Set an object containing the query string values.
 *
 * @param {Object} obj
 * @api public
 */

Request.prototype.qs = function(obj) {
  this.options.qs = obj;
};

/**
 * Set request timeout.
 *
 * @param {Number} time
 * @api public
 */

Request.prototype.timeout = function(time) {
  this.options.timeout = time;
};

/**
 * Execute the http request.
 *
 * @param {Function} fn
 * @api public
 */

Request.prototype.exec = function(fn) {
  this.options.url = this._base + this._url;
  http(this.options, fn);
};

/**
 * Primary export.
 */

module.exports = Request;
