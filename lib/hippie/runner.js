/**
 * External dependencies.
 */

var http = require('http');

/**
 * Internal dependencies.
 */

var Request = require('./request');

/**
 * Runner.
 *
 * @constructor
 */

function Runner() {
  if (!(this instanceof Runner)) return new Runner();
  this.request = new Request;
}

/**
 * Set HTTP method.
 *
 * @param {String} http method
 * @returns {Runner} self
 * @api public
 */

Runner.prototype.method = function(method) {
  this.request.method(method);
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
  this.request.url(url);
  return this;
};

/**
 * Perform the test.
 *
 * @param {Function} fn
 * @api public
 */

Runner.prototype.end = function(fn) {
  this.request.exec(fn);
};

/**
 * Sugar syntax for `method`, `url` and `end`.
 *
 * @param {String} url
 * @param {Function} `fn` if provided will perform the test instantly
 * @returns {Runner} self
 * @api public
 */

['GET'].forEach(function(method) {
  Runner.prototype[method.toLowerCase()] = function(url, fn) {
    this.method(method);
    this.url(url);
    if (fn) this.end(fn);
    return this;
  };
});

/**
 * Primary export.
 */

module.exports = Runner;
