## 手写 js 源码

本文主要针对一些常见的函数，手动实现方法

### call, apply, bind

call, apply, bind 是用于改变函数的 this 指向。其中 call,apply 只是传参不同，而 bind 是要返回函数。

1. call/apply 实现

call 和 apply 实现是比较相似的，只是传参上的不一样

```js
Function.prototype.mycall = function(thisArg) {
  if (typeof this !== "function") {
    throw Error("必须是函数调用");
  }
  // 获取参数
  const args = [...arguments].slice(1);
  thisArg = thisArg || window;
  // 挂载在对象上，转变this指向
  thisArg.fn = this;
  const result = thisArg.fn(...args);
  delete thisArg.fn;
  return result;
};

Function.prototype.myApply = function(thisArg) {
  if (typeof this !== "function") {
    throw Error("必须是函数调用");
  }
  const args = arguments[1];
  thisArg = thisArg || window;

  thisArg.fn = this;
  const result = thisArg.fn(...args);
  delete thisArg.fn;
  return result;
};
```

测试一下

```js
const bar = function() {
  console.log(this.name, arguments);
};
bar.prototype.name = "bar";

const foo = {
  name: "foo"
};

bar.mycall(foo, 1, 2, 3);
bar.myApply(foo, [1, 2, 3]);
```

2. bind 实现
   bind 与 call 和 apply 的区别就是需要返回函数。这边在 call/apply 基础上直接使用

```js
Function.prototype.mybind = function(thisArg) {
  if (typeof this !== "function") {
    throw TypeError("bind must be called on a function");
  }
  const args = Array.prototype.slice.call(arguments, 1),
    self = this,
    nop = function() {},
    bound = function() {
      // 需要判断是否是new出来的，如果是new出来的则作用域不变
      return self.apply(
        this instanceof nop ? this : thisArg,
        args.concat(Array.prototype.slice.call(arguments))
      );
    };
  if (this.prototype) {
    nop.prototype = this.prototype;
  }
  bound.prototype = new nop();
  return bound;
};
```

### reduce 实现

reduce 是一个累计处理参数的方法,这是一个处理数组的。

```js
简单点就是;
Array.prototype.myReduce = function() {
  const data = this;
  let preData = initData;
  for (let i = 0; i < data.length; i++) {
    preData = callback.apply(underfined, [preData, data[i], i, data]);
  }
  return preData;
};
上述就是更简单的实现方式，当然可以稍微完善一下，加上一些判断
Array.prototype.myReduce = function(callback) {
  const data = this,
    len = data.length;
  let k = 0,
    accumulator = undefined,
    kPreset = false,
    initValue = arguments.length > 1 ? arguments[1] : undefined;

  if (typeof callback != "function") {
    throw new Error("必须是回调函数");
  }
  if (len === 0 && arguments.length < 2) {
    throw new Error("数组为空，且没有初始值");
  }
  if (arguments.length > 1) {
    accumulator = initValue;
  } else {
    accumulator = data[k];
    ++k;
  }
  while (k < len) {
    //   判断是否拥有属性[,,,]这种
    kPreset = data.hasOwnProperty(k);
    if (kPreset) {
      const kValue = data[k];
      accumulator = callback.apply(undefined, [accumulator, kValue, k, data]);
    }
    ++k;
  }
  return accumulator;
};

// 测试
const rReduce = ["1", null, undefined, , 3, 4].myReduce((a, b) => a + b, 3);
const sReduce = ["1", null, undefined, , 3, 4].reduce((a, b) => a + b, 3);

console.log(rReduce);
console.log(sReduce);
```

### async-await 实现

在处理异步的时候，我们经常会使用这个来处理。我们来看一下，如何来实现一下呢？
其实 asynce-await 就是 promise+迭代器的语法糖。

```js
首先来看一下简单的迭代器使用方式;

const getIterator = function*() {
  yield "a";
  yield "b";
  yield "c";
};
const iterator = getIterator();
console.log(iterator.next());

通过关键字yield和迭代器next来实现。
然后我们就用迭代器和promise来模拟实现一下同步方式

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      // 迭代器
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
    // next的调用
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    // 判断是否已经结束
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
```

### debounce-throttle 实现

节流/防抖在开发中还是比较常见的,这边主要实现最简单的

```js
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
```

### 柯里化

什么是柯里化,这个比较的抽象,一种可重复调用的高阶函数.
这是实现一个简单的函数调用方式

```js
const curry = fn => {
  return (judge = (...args) => {
    args.length === fn.length
      ? fn(...args)
      : (...arg) => judge(...args, ...arg);
  });
};

const sum = (a, b, c, d) => a + b + c + d;

const currySum = curry(sum);

currySum(1)(2)(3)(4); // 10
currySum(1, 2)(3)(4); // 10
currySum(1)(2, 3)(4); // 10
```

### 深拷贝

实际中我们经常使用深拷贝,防止修改源数据.
这里是有针对性的实现几种类型

```js
// 通过对象的toString来判断类型
function getType(obj) {
  const str = Object.prototype.toString.call(obj);
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object"
  };
  return map[str];
}
// 这边主要对常用的function,array,function处理，其他更多就是各种处理
function deepCopy(ori) {
  const type = getType(ori);
  let copy;
  switch (type) {
    case "array":
      return copyArray(ori, copy);
    case "object":
      return copyObject(ori, copy);
    case "function":
      return copyFunction(ori, copy);
    default:
      return ori;
  }
}

function copyArray(ori, copy = []) {
  for (const [index, value] of ori.entries()) {
    copy[index] = deepCopy(value);
  }
  return copy;
}

function copyObject(ori, copy = {}) {
  for (const [key, value] of Object.entries(ori)) {
    copy[key] = deepCopy(value);
  }
  return copy;
}
function copyFunction(ori, copy = () => {}) {
  const fun = eval(ori.toString());
  fun.prototype = ori.prototype;
  return fun;
}

let a = ["aa", "bb", "cc"];
let b = deepCopy(a);
b[1] = 2;
console.log(a);
console.log(b);
```
