/**
 * External dependencies.
 */

var request = require('request');

/**
 * Internal dependencies.
 */

var serializers = require('./serializers');

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
  this.serialize = serializers.raw;
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
 * Yield the options for `request`.
 *
 * @param {Function} callback
 * @returns {Client} self
 * @api public
 */

Client.prototype.opts = function(fn) {
  fn(this.options);
  return this;
};

/**
 * Set Content-Type and Accept headers to
 * application/json. Also changes the serializer.
 *
 * @returns {Client} self
 * @api public
 */

Client.prototype.json = function() {
  this.header('Content-Type', 'application/json; charset=utf-8');
  this.header('Accept', 'application/json');
  this.serializer(serializers.json);
  return this;
};

/**
 * Set the Content-Type to x-www-form-urlencoded and
 * set the correct serializer.
 *
 * @returns {Client} self
 * @api public
 */

Client.prototype.form = function() {
  this.header('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
  this.serializer(serializers.form);
  return this;
};

/**
 * Set request body serializer.
 *
 * @param {Function} serializer
 * @returns {Client} self
 * @api public
 */

Client.prototype.serializer = function(serializer) {
  this.serialize = serializer;
  return this;
};

/**
 * Send given `data`.
 *
 * @param {Object} data
 * @returns {Client} self
 * @api public
 */

Client.prototype.send = function(data) {
  this.data = data;
  return this;
};

/**
 * Set basic auth credentials.
 *
 * @param {String} user
 * @param {String} password
 * @returns {Client} self
 * @api public
 */

Client.prototype.auth = function(user, pass) {
  this.options.auth = { user: user, pass: pass };
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
  'HEAD',
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
  if (this.data) {
    this.options.body = this.serialize(this.data);
  } else {
    delete this.options.headers['Content-Type'];
  }
  request(this.options, fn);
};

/**
 * Primary export.
 */

module.exports = Client;
