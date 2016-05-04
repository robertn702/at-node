const at = (time, cb) => {
  let later;
  if (!(time instanceof Date)) {
    let timestamp = Date.parse(time);
    if (!isNaN(timestamp)) {
      later = new Date(time);
    } else {
      throw new Error('[at] "time" must be parseable date/time');
    }
  } else {
    later = time;
  }

  const now = new Date();
  const timeDiff = later.getTime() - now.getTime();

  if (timeDiff <= 0) {
    cb();
    return;
  }
  const timeout = setTimeout(cb, timeDiff);
  return () => {
    clearTimeout(timeout);
  };
};

module.exports = at;
