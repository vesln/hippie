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
 * Primary export.
 */

module.exports = Runner;
