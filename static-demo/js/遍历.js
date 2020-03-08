var obj = {
  name: "Poly",
  career: "it"
};
Object.defineProperty(obj, "age", { value: "forever 18", enumerable: false });
Object.prototype.protoPer1 = function() {
  console.log("proto");
};
Object.prototype.protoPer2 = 2;
// for in 可以遍历出原型链上的方法, 可遍历的属性, enumerable为true
// for (let i in obj) {
//   console.log(i);
// }
// for of可遍历迭代器
// for (let [key, value] of Object.entries(obj)) {
//   console.log(key, value);
// }
// 使用Object.keys来获取key
// let keys = Object.keys(obj);
// for (let i = 0; i < keys.length; i++) {
//   console.log(keys[i], obj[keys[i]]);
// }
// keys.forEach(item => {
//   console.log(item, obj[item]);
// });

// getOwnPropertyName获取当前对象上的属性
// let names = Object.getOwnPropertyNames(obj);
// names.forEach(key => {
//   console.log(key, obj[key]);
// });

// 备注:
// for in, for of, while可用于async-await
// forEach、map、filter、reduce 不要使用async-await
