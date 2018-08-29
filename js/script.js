{
	let a=10;
	var  b=1;
}
let c=2;

//1. let命令类似var，但是所声明变量只在let命令所在代码块内有效
for(let i=0;i<10;i++){
} 
//console.log(i) 会报错
for(let i=0;i<3;i++){
	let i="abc";
	console.log(i);
}
//2. 函数内部的变量i 与循环变量i不在同一个作用域。 各有单独的作用域。

//3.不存在变量提升现象
// var 命令会发生"变量提升"现象，
// let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错

//4.暂时性死区
//只要块级作用域存在let命令，它所声明的变量就"绑定"这个区域，不在受外部的影响
var tmp=123;
if(true){
	tmp="tmp"; // 报错
	let tmp;
}     
// ES6命令明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，
// 从一开始就形成了封闭作用域，凡是在声明之前就使用这些变量，就会报错。
// 有些死区比较隐蔽，不太容易发现
function bar(x=y,y=2){return [x,y]; } 
 bar();  //报错， 因为参数x默认值等于另一个参数y，y还没有声明，属于死区
function bar(x=2,y=x){ return[x,y];}
bar(); //不会报错
// 暂时性死区的本质是，只要进入当前作用域，索要使用的变量就已经存在，但不可获取
// 只有等到声明变量的那一行代码出现，才可以获取和使用该变量

//5 不允许重复声明
// let 不允许在相同作用域内，重复声明同一个变量
function func(){ 
   let a=10;
   var a=1;
}//报错
function func(){
	let a=1;
	let a=2;
}//报错
//因此不能再函数内部重新声明参数
function func(arg){ let arg;}//报错
function func(arg){ { let arg;} } //不报错

//6.块级作用域
// ES5只有全局作用域和函数作用域，这带来很多不合理的场景

function f1(){
	let n=5;
	if(true){
		let n=10;
	}
	console.log(n); //5
}
//外层作用域无法读取内层作用域的变量
//内层作用域可以定义外层作用域的同名变量
//
//7.在块级作用域声明的函数
//   允许在块级作用域内声明函数
//    函数声明类似于var，即会提升到全局作用域活函数作用域的头部
//    同时，函数声明还会提升到所在的块级作用域的头部
//     （只对ES6的浏览器实现有效，其他环境不用遵守，还是讲块级作用域的函数声明当做let处理）
//     
//     const
//       const声明一个只读的常量，一旦声明，常量的值就不能改变
//          （必须立即初始化，不能留到以后赋值）
//          只在声明所在的块级作用域内有效
//        const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动
//                   对于简单类型的数据，值就保存在变量指向的那个内存地址，等同于常量
//                   但对于复合类型的数据，变量指向的内存地址，保存的只是一个指针。
//        
//        ES6 为了改变这一点，一方面规定，为了保持兼容性，
//        var命令和function命令声明的全局变量，依旧是顶层对象的属性；
//        另一方面规定，let命令、const命令、class命令声明的全局变量，
//        不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。