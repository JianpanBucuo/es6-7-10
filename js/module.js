//es6模块的设计思想是尽量的静态化
//使得编译时就能确定模块的依赖关系
//以及输入和输出的变量
//Commonjs模块就是对象，输入时必须查找对象属性

let {stat,exists,readFile}=require("fs");
//等同于
let _fs=require("fs");
let stat=_fs.stat;
let exists=_fs.exists;
let readFile=_fs.readFile;

//上面代码的实质是整体加载fs模块(fs的所有方法)
//生成一个对象_fs 然后再从这个对象上面读取3个方法
//这种加载称为“运行时加载”
//因为只有运行时才能得到这个对象
//导致完全没办法在编译时做“静态优化”

//es6模块不是对象。而是通过export命令显式制定输出的代码，
//再通过import命令输入

import {stat,exists,readFile} from "fs";
//上面代码的实质是从fs模块加载3个方法，
//其他方法不加载，这种加载称为
//“编译时加载”或者“静态加载”
//即es6可以在编译时就完成模块加载
//效率要比commonjs模块的加载方式高
//当然，这也导致了没法引用es6模块本身
//因为它不是对象


//3 export 命令

//export命令规定模块的对外借口
//import命令用于输入其他模块提供的功能

//一个模块就是一个独立的文件，该文件内部的所有变量
//外部无法获取，如果你希望外部能够读取模块内部的
//某个变量，就必须使用export关键字输出该变量

export var firstName="Michael";
export var lastName="Jackson";
//定外一种写法


let firstName="Michael";
const lastName="Jackson";
export { firstName,lastName };

//export命令除了输出变量，还可以输出函数或类

export function multiply(x,y){
	return x*y;
}
//通常情况下，export输出的变量就是本来的名字
//但是可以使用as关键字重命名

function v1(){}
function v2(){
}

export {
	v1 as streamV1,
	v2 as streamV2,
	v2 as streamLastestVersion
}
//上面代码使用as关键字
//重命名了函数v1和v2的对外借口
//重命名后，v2可以用不同的名字输出两次

//需要特别注意的是
//export 命令规定的是对外的借口，
//必须与模块内部的变量建立一一对应的关系

//1
export var m=1;
//2
var m=1;
export {m};
//3
var n=2;
export {n as m};
//4
export function f(){}
//5
function f(){}
export {f};

//export语句输出的借口
//与其对应的值是动态绑定关系
//即通过该借口，可以去的哦啊模块内部试试的值

export var foo="bar";
setTimeout(()=>foo="baz",500);
//上面代码输出的变量foo，值为bar
//500毫秒后变成baz
//最后 export命令可以出现在模块的任何位置
//只要处于模块顶层就可以
//如果处于块级作用于内就会报错
//import命令也是如此

//export命令定义了模块的对外接口以后，
//其他js文件就可以通过import命令加载这个模块

import {firstName,lastName} from "./profile.js";
function setName(element){
	element.textContent=firstName+" "+ lastName;
}

//上面代码的import命令，用于加载profile.js文件
//并从中输入变量
//import命令接受一对大括号
//里面指定要从其他模块导入的变量名
//大括号里面的变量名，必须与被导入模块对外接口的名称相同

import {lastName as surname} from "./profile.js";


//import命令输入的变量都是只读的，
//因为它的本质是输入接口
//也就是说，不允许在加载模块的脚本里面
//改写借口

import {a} from "./xxx.js";
a={}//error

//import后面的from指定模块的位置，可以是相对路径
//也可以是绝对路径
//import命令具有提升效果，会提升到
//整个模块的头部，首先执行
//由于import是静态执行，
//所以不能使用表达式和变量
//这些只有在运行时才能得到结果的语法结构

//模块的整体加载
//除了指定加载某个输出值，
//还可以使用整体加载
//即用型号*指定一个对象，所有输出值都加载在这个对象上面

//circle.js
export function area(radius){
	return Math.PI*radius*radius;
}
export function circumference(radius){
	return Math.PI*2*radius;
}
//main.js
import {area,circumference} from "./circle.js";

//整体加载的方法

import * as circle from "./circle.js";

circle.foo="hello"; //error
circle.area=function(){} //error

//export default命令

//为了给用户提供方便。
//让他们不用阅读文档就能加载模块
//就要用到export default 命令
//为模块指定默认输出
//export-default.js
export default function(){
	console.log("foo");
}

//import-default.js
import customName from "./export-default";
customName(); //"foo"

//下面比较一下默认输出和正常输出
export default function crc32(){}
import crc32 from "./crc32";

export function crc32(){}
import {crc32} from "./crc32";

//export default命令用于指定模块的默认输出
//显然，一个模块只能有一个默认输出
//因此export default命令只能呢个使用一次
//所以import命令后面才不同加大括号
//因为只可能唯一对应export default命令
//本质上，export default 就是输出一个叫做default的变量或方法
//然后系统允许你为它取任意名字

function add(x,y){
	return x*y;
}
export { add as default};

//等同于
export default add;

import {default as foo } from "modules";
//等同于
import foo from "modules"

//export default命令的本质是将后面的值，赋给default变量

// 7.export和import

//如果在一个模块之中，
//先输入后输出同一个模块
//import语句可以与export语句写在一起。

export { foo, bar } from "my_module";
//可以理解为
import { foo,bar } from "my_module";
export {foo, bar};

//注意！ 写成一行以后，
//foo和bar实际上并没有被导入当前模块，
//只是相当于对外转发了这两个接口。
//导致当前模块不能直接使用foo和bar

//模块的接口改名和整体输出
//接口改名
export {foo as myFoo} from "my_module";
//整体输出
export * from "my_module";

//具体接口改名写法如下

export {es6 as default} from "./someModule";

import {es6} from "./someModule";
export default es6;

//8.模块的继承
 
 //假设有一个circleplus模块，继承了circle

 export * from "circle";
 export var e=2.71821;
 export default function(x){
 	return Math.exp(x);
 }
 //上面代码中的export *表示再输出circle模块的所有属性和方法

 //注意!!!! export* 命令会忽略circle模块的default方法
 
 //然后，上面代码又输出了自定义的e变量和默认方法
 //这时，也可以将circle的属性或方法改名后再输出
 export {area as circleArea} from "circle";

 //mian.js
 import * as math from "circleplus";
 import exp from "circleplus";

 //9.跨模块常量

 //const声明的常量只在当前代码块有效
 //如果想设置跨模块的常量，或者说一个值要被多个模块共享
 //可以采用下面的写法
 //constants.js模块
 export const A=1;
 export const B=2;
 export const C=4;
  	
// test1.js模块

import * as constants from "./constants";
console.log(constants.A);
console.log(constants.B);

//test2.js模块
import {A,B} from "./constants";
console.log(A);
console.log(B);

//   constants/db.js
export const db={
	url:"http://my.couchbserver.local:5984",
	admin_username:"admin",
	admin_password:"admin password"
}

//     constants/user.js

export const users=["root","admin","staff","ceo"];

// constants/user.js
export {db} from "./db";
export {users} form "./users";

//script.js
import {db,users} from "./constants/index";

// import 
// import命令会被Javascript引擎静态分析，先于模块内的其他语句执行
// (import 命令叫做连接 binding其实更合适)

if(x===2){
	import MyModual from "./MyModual";
}
// 前面介绍过，import命令会被javascript引擎静态分析，
// 先于模块内的其他语句执行，所以。下面的代码会报错。
//这样的设计，固然有利于编译器提高效率，但也导致
//无法再运行时加载模块，在语法上，条件加载就不可能实现
//如果import命令要取代node的require方法，这就形成了一个障碍
//因为require是运行时加载模块，import命令无法取代require的动态加载功能

const path= "./"+fileName;
const myModual= require(path);
// 上面的语句就是动态加载，require到底加载哪一个模块，
// 只有运行时才知道。
