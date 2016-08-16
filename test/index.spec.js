var assert = require('../');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;

function makeFulfillingPromise() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve('a');
    }, 50);
  });
}

function makeRejectingPromise() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error('Rejected'));
    }, 50);
  });
}

chai.use(chaiAsPromised);

describe('Test 4 promise functions', function () {
  it('Should fail if call "isRejected" on fulfilling promise', function () {
    return expect(assert.isRejected(makeFulfillingPromise())).to.be.rejected;
  });

  it('Should success if call "isFulfilled" on fulfilling promise', function () {
    return expect(assert.isFulfilled(makeFulfillingPromise())).to.be.fulfilled;
  });

  it('Should success if call "becomes" with valid data on fulfilling promise', function () {
    return expect(assert.becomes(makeFulfillingPromise(), 'a')).to.be.fulfilled;
  });

  it('Should fail if call "becomes" with invalid data on fulfilling promise', function () {
    return expect(assert.becomes(makeFulfillingPromise(), 'b')).to.be.rejected;
  });

  it('Should fail if call "doesNotBecome" with valid data on fulfilling promise', function () {
    return expect(assert.doesNotBecome(makeFulfillingPromise(), 'a')).to.be.rejected;
  });

  it('Should success if call "doesNotBecome" with invalid data on fulfilling promise', function () {
    return expect(assert.doesNotBecome(makeFulfillingPromise(), 'a')).to.be.rejected;
  });

  it('Should success if call "isRejected" on rejecting promise', function () {
    return expect(assert.isRejected(makeRejectingPromise())).to.be.fulfilling;
  });

  it('Should fail if call "isFulfilled" on rejecting promise', function () {
    return expect(assert.isFulfilled(makeRejectingPromise())).to.be.rejected;
  });

  it('Should fail if call "becomes" on rejecting promise', function () {
    return expect(assert.becomes(makeRejectingPromise(), 'a')).to.be.rejected;
  });
});
