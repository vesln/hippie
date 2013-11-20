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
 * Execute the http request.
 *
 * @param {Function} fn
 * @api public
 */

Request.prototype.exec = function(fn) {
  var options = {
    uri: this._url,
    method: this._method,
  };

  http(options, fn);
};

/**
 * Primary export.
 */

module.exports = Request;
