Function.prototype.mybind = function(thisArg) {
  if (typeof this !== "function") {
    throw TypeError("bind must be called on a function");
  }
  const args = Array.prototype.slice.call(arguments, 1),
    self = this,
    nop = function() {},
    bound = function() {
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

// 测试
const bar = function() {
  console.log(this.name, arguments);
};

bar.prototype.name = "bar";

const foo = {
  name: "foo"
};

// const bound = bar.bind(foo, 22, 33, 44);
// const bound = bar.mybind(foo, 22, 33, 44);
// new bound();

// bound();

function a() {
  console.log(this.prototype);
}
new a();
a();
