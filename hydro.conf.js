/**
 * Local dependencies.
 */

var server = require('./test/support/server');
var hippie = require('./');

/**
 * Hippie factory.
 *
 * Return a new hippie instance with the base URL
 * configured to the local test server.
 *
 * @returns {Hippie}
 * @api public
 */

function api() {
  return hippie().base('http://localhost:' + server.PORT);
}

/**
 * Test setup.
 *
 * @param {Hydro} hydro
 * @api public
 */

module.exports = function(hydro) {
  hydro.set({
    suite: 'hippie',
    formatter: 'hydro-dot',
    chai: {
      styles: 'should',
      stack: true
    },
    globals: {
      api: api
    },
    plugins: [
      'hydro-clean-stacks',
      'hydro-bdd',
      'hydro-chai',
    ],
    tests: [
      'test/*.test.js'
    ]
  });

  hydro.on('pre:all', function(_, done) {
    server.listen(server.PORT, done);
  });
};
