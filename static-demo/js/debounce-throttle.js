function debounce(fn, wait) {
  let timeout;
  return function() {
    let _this = this;
    let args = arguments;
    if (timeout) clearInterval(timeout);
    timeout = setTimeout(() => {
      fn.apply(_this, args);
    }, wait);
  };
}

function throttle(fn, delay) {
  let pTime = Date.now();
  return function() {
    let curTime = Date.now();
    if (curTime - pTime > delay) {
      fn.apply(this, arguments);
      pTime = curTime;
    }
  };
}
