'use strict';

var at = require('../src/at');
var expect = require('expect');

describe('at', function() {
  it('should be a function', function() {
    expect(typeof at).toBe('function');
  });

  it('should return a function with valid inputs', function() {
    var cancelFunction = at('January 1, 2020', function() {});
    expect(typeof cancelFunction).toBe('function');
  });

  it('should return undefined if the later date has already passed', function() {
    var cancelFunction = at('January 1, 1999', function() {});
    expect(cancelFunction).toBe(undefined);
  });

  it('should throw an error if date is invalid', function() {
    var spy = expect.createSpy();
    try {
      var cancelFunction = at('asdf', function() {});
    } catch (err) {
      spy();
    }
    expect(spy).toHaveBeenCalled();
  });

  it('should return immediately execute the function if the later date has already passed', function() {
    var laterFunction = expect.createSpy();
    var cancelFunction = at('January 1, 1999', laterFunction);
    expect(laterFunction).toHaveBeenCalled();
  });

  it('should call the callback function at the specified time', function(done) {
    var laterFunction = expect.createSpy();
    var now = new Date();
    var timeOffset = 25; // current time + timeOffset seconds in the future
    var laterTime = new Date(now.getTime() + timeOffset);
    var cancelFunction = at(laterTime, laterFunction);
    expect(laterFunction).toNotHaveBeenCalled();
    setTimeout(function() {
      expect(laterFunction).toHaveBeenCalled();
      done();
    }, timeOffset);
  });

  it('should successfully cancel the function', function(done) {
    var laterFunction = expect.createSpy();
    var now = new Date();
    var timeOffset = 25; // current time + 1 second in the future
    var laterTime = new Date(now.getTime() + timeOffset);
    var cancelFunction = at(laterTime, laterFunction);
    cancelFunction();
    setTimeout(function() {
      expect(laterFunction).toNotHaveBeenCalled();
      done();
    }, timeOffset);
  });
});
