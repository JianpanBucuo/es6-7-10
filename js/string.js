//字符串
//  1.加入多行字符串的概念
//  2.将变量的值嵌入字符串的能力
//  3.插入经过安全转换后的字符串的能力
var msg = ["I","have"].join("\n");

let msg = `
          I
          have
          `;

// 字符串占位符
占位符由一个左侧的${  和右侧的 } 符号组成。
中间可以包括任意的javascript表达式。
let name = "Nic";
let msg3 = `My name is ${name}`;  
// 模板字面量可以访问作用域中所有可访问的变量。
// 无论在 严格模式 还是 非严格模式下，尝试嵌入一个未定义的变量总会抛出错误。
// 

let count = 10;
let price = 0.25;
let msg4 = `${count} items cost $${(count * price).toFixed(2)}.`;

let name = "Nic";
msg = ` Hello ${ ` My name is ${ name } ` } `
// 模板字面量被嵌入到另一个模板字面量。

// 标签模板

// 每个模板标签都可以执行模板字面量上的转换并返回最终的字符串值。
// 标签指的是在模板字面量第一个反撇号  (`) 前方标注的字符串

let msg = tag'Hello world';
  // 模板字面量 Hello world 的模板标签式 tag
   