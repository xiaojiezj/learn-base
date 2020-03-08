Array.prototype.myReduce = function(callback) {
  //   const data = this;
  //   let preData = initData;
  //   for (let i = 0; i < data.length; i++) {
  //     preData = callback.apply(underfined, [preData, data[i], i, data]);
  //   }
  //   return preData;
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
