/**
 * Primary export.
 */

module.exports = require('./hippie/client');

/**
 * Export assert.
 */

module.exports.assert = require('./hippie/assert');

/**
 * User configurable property, influences whether or not
 * the `showDiff` flag should be included in the thrown
 * AssertionErrors.
 */

module.exports.assert.showDiff = false;
