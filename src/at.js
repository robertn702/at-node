function at(time, cb) {
  var later;
  if (!(time instanceof Date)) {
    var timestamp = Date.parse(time);
    if (!isNaN(timestamp)) {
      later = new Date(time);
    } else {
      throw new Error('[at] "time" must be parseable date/time');
    }
  } else {
    later = time;
  }

  var now = new Date();
  var timeDiff = later.getTime() - now.getTime();

  if (timeDiff <= 0) {
    cb();
    return;
  }
  var timeout = setTimeout(cb, timeDiff);
  return function() {
    clearTimeout(timeout);
  };
};

module.exports = at;
