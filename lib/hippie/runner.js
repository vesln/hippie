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
 * Set the HTTP method to "GET" and also
 * set `url`.
 *
 * @param {String} url
 * @returns {Runner} self
 * @api public
 */

Runner.prototype.get = function(url) {
  this.request.method('GET');
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
 * Primary export.
 */

module.exports = Runner;
