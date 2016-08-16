var assert = require('power-assert');

var customizedAssert = assert.customize({});

assert.notEqual(customizedAssert, assert);

function noop() {

}

module.exports = Object.assign(customizedAssert, {

  isRejected: function isRejected(promise, expected, message) {
    return promise.then(function resolve() {
      return customizedAssert.throws(noop, expected, message);
    }, function reject(e) {
      return customizedAssert.throws(function () { throw e; }, expected, message);
    });
  },

  isFulfilled: function isFulfilled(promise, message) {
    return promise.then(
      noop,
      function reject(e) {
        return customizedAssert.doesNotThrow(function () { throw e; }, message);
      }
    );
  },

  becomes: function becomes(promise, value, message) {
    return promise.then(
      function resolve(ret) {
        return customizedAssert.equal(ret, value);
      },
      function reject(e) {
        return customizedAssert.doesNotThrow(function () { throw e; }, message);
      }
    );
  },

  doesNotBecome: function doesNotBecome(promise, value, message) {
    return promise.then(
      function resolve(ret) {
        return customizedAssert.notEqual(ret, value);
      },
      function reject(e) {
        customizedAssert.doesNotThrow(function () { throw e; }, message);
      }
    );
  }

});
