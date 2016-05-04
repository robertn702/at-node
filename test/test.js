'use strict';

const at = require('../src/at');
const expect = require('expect');

describe('at', function() {
  it('should be a function', function() {
    expect(typeof at).toBe('function');
  });

  it('should return a function with valid inputs', function() {
    const cancelFunction = at('January 1, 2020', function() {});
    expect(typeof cancelFunction).toBe('function');
  });

  it('should return undefined if the later date has already passed', function() {
    const cancelFunction = at('January 1, 1999', function() {});
    expect(cancelFunction).toBe(undefined);
  });

  it('should return immediately execute the function if the later date has already passed', function() {
    const laterFunction = expect.createSpy();
    const cancelFunction = at('January 1, 1999', laterFunction);
    expect(laterFunction).toHaveBeenCalled();
  });

  it('should call the callback function at the specified time', function(done) {
    const laterFunction = expect.createSpy();
    const now = new Date();
    const timeOffset = 25; // current time + 1 second in the future
    const laterTime = new Date(now.getTime() + timeOffset);
    const cancelFunction = at(laterTime, laterFunction);
    expect(laterFunction).toNotHaveBeenCalled();
    setTimeout(function() {
      expect(laterFunction).toHaveBeenCalled();
      done();
    }, timeOffset);
  });

  it('should successfully cancel the function', function(done) {
    const laterFunction = expect.createSpy();
    const now = new Date();
    const timeOffset = 25; // current time + 1 second in the future
    const laterTime = new Date(now.getTime() + timeOffset);
    const cancelFunction = at(laterTime, laterFunction);
    cancelFunction();
    setTimeout(function() {
      expect(laterFunction).toNotHaveBeenCalled();
      done();
    }, timeOffset);
  });
});
