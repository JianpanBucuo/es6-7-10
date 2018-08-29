//运行时加载
let {stat,exists,readFile}=require("fs");
// 等同于
let _fs=require("fs");
let stat=_fs.stat;
let exists=_fs.exists;
let readFile=_fs.readFile;

//ES6
//编译时加载
import {stat ,exists, readFile} from "fs";

//ES6的模块自动采用严格模式

//3 export命令
模块功能主要由两个命令构成 export和import。
export命令用于规定模块的对外接口，
import命令用于输入其他模块提供的功能。

//一个模块就是一个独立的文件，该文件内部的所有变量，外部无法获取
//如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。

let a=1;
let b=2;
let c=3;

export {a,b,c}

export命令除了输出变量，还可以输出函数或类

export function multiply(x,y){
	return x*y;
}
//通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名

export {
	a as v1,
	b as v2,
	c as v3
}

export x //error
export x=1;

var x=1;
export {x}

另外export语句输出的接口，与其对应的值是动态绑定关系，
即通过该接口。可以取到内部实时的值

export var foo="bar";
setTimeout(()=>foo="baz",500);

//export要处于模块顶层

//import 
//import命令接受一大括号，里面制定要从其他模块导入的变量名。
//大括号里面的变量名，必须与被导入模块对外接口的名称相同

import {lastName as sureName} from "./profile.js";

//脚本加载了变量a，对其重新赋值就会报错，因为a是一个只读的接口，
//但是，如果a是一个对象，改写a的属性是允许的。

import 命令具有提升效果，会提升到整个模块的头部，首先执行

//模块的整体加载
// 除了指定加载某个输出值，还可以使用整体加载，即用星号(*)指定一个对象，
// 所有输出值都加载在这个对象上面
//circle.js
export function area(radius){
	return Math.PI*radius*radius;
}
export function circumference(radius){
	return 2*Math.PI*radius;
}
//main.js
import * as circle from "./circle.js";

//export default 命令

使用import命令的恶时候，用户需要知道所要加载的变量名或函数名，否则无法加载
但是，用户希望快速上手，为了给用户提供方便，就要用到export default
//export-default.js
export default function(){console.log("foo");}
//import-default.js
import customName from "./export-default.js";

export default function crc32(){}
import crc32 from "crc32";

export {crc32};
import {crc32} from "crc32"; 

7.export与import的复合写法

export {foo,bar } from "my_module";

import {foo,bar } from "my_module";
export {foo,bar};