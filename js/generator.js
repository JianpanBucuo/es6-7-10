Generator 函数是ES6提供的一种异步编程解决方案
Generator函数是一个状态体，封装了多个内部状态。
执行Genertor函数会返回一个遍历器对象，
Generator除了状态机，还是一个遍历器生成函数。
返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态。

//形式上，Generator函数是一个普通函数，但是有两个特征
//一个是 function关键字与函数名之间有一个星号
//二是，函数体内部使用 yield表达式，
//定义不同的内部状态

yield 在英语里的意思是产出

function* helloWorldGenerator () {
	yield "hello";
	yield "world";
	return "ending";
}