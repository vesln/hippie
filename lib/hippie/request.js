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
  this._method = 'GET';
  this._base = '';
  this._headers = {};
}

/**
 * Set HTTP method.
 *
 * @param {String} method
 * @api public
 */

Request.prototype.method = function(method) {
  this._method = method;
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
  this._headers[key] = val;
};

/**
 * Execute the http request.
 *
 * @param {Function} fn
 * @api public
 */

Request.prototype.exec = function(fn) {
  var options = {
    uri: this._base + this._url,
    headers: this._headers,
    method: this._method,
  };

  http(options, fn);
};

/**
 * Primary export.
 */

module.exports = Request;
