//es6在Number对象上，新提供了 isFinite() isNaN()方法
// Number.Finite()用来检查一个数组是否是有限的
Number.isFinite(15)//true
Number.isFinite(NaN); //false
Number.isFinite(-Infinity); //false
Number.isFinite(false) //false
//只要参数类型不是数值，Number.isFinite一律返回false

//Number.isNaN()用来检查一个值是否为NaN
Number.isNaN(NaN); //true
Number.isNaN(true);// false
//如果参数类型不是NaN,Number.isNaN一律返回false
//
//ES6将全局房啊parseInt() parseFloat()移植到了Number对象上面
//行为保持不变
//这样做的目的，是逐步减少全局性方法，使得语言逐渐模块化
//
//4.Number.isInteger()
//Number.isInteger()用来判断一个数值是否为整数
Number.isInteger(23);
//在JavaScript内部， 整数和浮点数采用的是同样的储存方法 所以 25和25.0被视为同一个值
//如果不是数值。 Number.isInteger()返回false
//ES6在Number对象上面，新增了一个极小的常量
// Number.EPSILON
// 