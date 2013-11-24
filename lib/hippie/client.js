/**
 * External dependencies.
 */

var request = require('request');

/**
 * Internal dependencies.
 */

var serializers = require('./serializers');
var parsers = require('./parsers');
var expect = require('./expect');

/**
 * Client.
 *
 * @constructor
 */

function Client() {
  if (!(this instanceof Client)) return new Client;
  this._base = '';
  this.serialize = serializers.raw;
  this.parse = parsers.raw;
  this.middlewares = [];
  this.expectations = [];
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
 * application/json. Also changes the configured
 * serializer and parser.
 *
 * @returns {Client} self
 * @api public
 */

Client.prototype.json = function() {
  this.header('Content-Type', 'application/json; charset=utf-8');
  this.header('Accept', 'application/json');
  this.serializer(serializers.json);
  this.parser(parsers.json);
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
  this.serializer(serializers.urlencoded);
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
 * Set response body parser.
 *
 * @param {Function} parser
 * @returns {Client} self
 * @api public
 */

Client.prototype.parser = function(parser) {
  this.parse = parser;
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
 * Register a middleware.
 *
 * @param {Function} fn
 * @returns {Client} self
 * @api public
 */

Client.prototype.use = function(fn) {
  this.middlewares.push(fn);
  return this;
};

/**
 * Register an expectation.
 *
 * @param {Function} fn
 * @api public
 */

Client.prototype.expect = function(fn) {
  this.expectations.push(fn);
  return this;
};

/**
 * Status code expectation.
 *
 * @param {Number} status code
 * @returns {Client} self
 * @api public
 */

Client.prototype.expectStatusCode =
Client.prototype.expectStatus =
Client.prototype.expectCode = function(code) {
  this.expect(expect.statusCode(code));
  return this;
};

/**
 * Set a header expectation.
 *
 * @param {String} key
 * @param {String} val
 * @returns {Client} self
 * @api public
 */

Client.prototype.expectHeader = function(key, val) {
  this.expect(expect.header(key, val));
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

Client.prototype.end = function(end) {
  var self = this;

  this.options.url = self._base + self._url;

  if (!this.data) {
    this.options.headers['Content-Type'];
    return this.runMiddlewares(this.options, end);
  }

  this.serialize(this.data, function(err, body) {
    if (err) return end(err);
    self.options.body = body;
    self.runMiddlewares(self.options, end);
  });
};

/**
 * Perform the HTTP request, parse the response
 * and run the expectations.
 *
 * @param {Object} options
 * @param {Function} end
 * @api private
 */

Client.prototype.http = function(options, end) {
  var self = this;
  request(options, function(err, res) {
    if (err) return end(err);
    self.parse(res.body, function(err, body) {
      if (err) return end(err);
      self.verify(err, res, body, end);
    });
  });
};

/**
 * Call all registered middlewares with `options`.
 *
 * @param {Object} options
 * @param {Function} end
 * @api private
 */

Client.prototype.runMiddlewares = function(options, end) {
  var self = this;
  var middlewares = this.middlewares.slice(0);
  (function next(options, fn) {
    var mid = middlewares.shift();
    if (!mid) return self.http(options, end);
    mid(options, next);
  })(options);
};

/**
 * Verify the expectations.
 *
 * @param {Object} error
 * @param {Object} response
 * @param {Mixed} body
 * @param {Function} end
 * @api private
 */

Client.prototype.verify = function(err, res, body, end) {
  var expectations = this.expectations.slice(0);
  (function verify(err, res, body) {
    var expect = expectations.shift();
    if (!expect || err) return end(err, res, body);
    expect(err, res, body, verify);
  })(err, res, body);
};

/**
 * Primary export.
 */

module.exports = Client;
