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
