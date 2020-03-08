function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
const asyncFunc = _asyncToGenerator(function*() {
  const e = yield new Promise(resolve => {
    setTimeout(() => {
      resolve("e");
    }, 1000);
  });
  const a = yield Promise.resolve("a");
  const d = yield "d";
  const b = yield Promise.resolve("b");
  const c = yield Promise.resolve("c");
  return [a, b, c, d, e];
});

asyncFunc().then(res => {
  console.log(res);
});

// const getIterator = function*() {
//   yield "a";
//   yield "b";
//   yield "c";
// };
// const iterator = getIterator();
// console.log(iterator.next());
