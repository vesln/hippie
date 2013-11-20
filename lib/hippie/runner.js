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
 * Perform the test.
 *
 * @param {Function} fn
 * @api public
 */

Runner.prototype.end = function(fn) {
  this.request.exec(fn);
};

/**
 * Register proxy methods.
 *
 * @see Request
 */

['base', 'url', 'method'].forEach(function(fn) {
  Runner.prototype[fn] = function(val) {
    this.request[fn](val);
    return this;
  };
});

/**
 * Sugar syntax for `method`, `url` and `end`.
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
