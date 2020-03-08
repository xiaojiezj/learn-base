const curry = fn => {
  return (judge = (...args) => {
    console.log(args);
    console.log(fn);
    console.log(fn.length);
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
