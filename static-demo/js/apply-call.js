Function.prototype.mycall = function(thisArg) {
  if (typeof this !== "function") {
    throw Error("必须是函数调用");
  }
  const args = [...arguments].slice(1);
  thisArg = thisArg || window;

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

const bar = function() {
  console.log(this.name, arguments);
};
bar.prototype.name = "bar";

const foo = {
  name: "foo"
};

bar.mycall(foo, 1, 2, 3);
bar.myApply(foo, [1, 2, 3]);
