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
 * Execute the http request.
 *
 * @param {Function} fn
 * @api public
 */

Request.prototype.exec = function(fn) {
  var options = {
    uri: this._base + this._url,
    method: this._method,
  };

  http(options, fn);
};

/**
 * Primary export.
 */

module.exports = Request;
