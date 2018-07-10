 //变量的解构赋值
 // 数组的结构赋值
 
 // ES6允许按照一定模式，对变量进行赋值
 let [a,b,c]=[1,2,3];
 //本质上，这种写法属于"模式匹配"，只要等号两边的模式相同，左边的变量就会被赋予对应的值
 let [foo,[[bar],baz]]=[1,[[2],3]];
 let [ , ,third]=["foo","bar","baz"];
 let [x,,y]=[1,2,3];
 let [head,...tail]=[1,2,3,4];

 // let [x,y,...z]=["a"];
 //如果解构不成功，变量的值就等于undefined
 //另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组
 // let [x,y]=[1,2,3];
 let [a,[b],d]=[1,[2,3],4];// a=1,b=2,d=4

 //默认值
 //解构赋值允许指定默认值
 let [foo=true]=[];
 // let [x,y="b"]=["a"];
 // let [x,y="b"]=["a",undefined];
 

 function f(){console.log("aaa");}
 let [x=f()]=[1];
 //如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
 //
 //2.对象的解构赋值
 //解构不仅可以用于数组，还可以用于对象
 // let {foo,bar}={foo:"aaa",bar:"bbb"};
 //对象的解构与数组有一个重要的不同。
 //数组的元素是按次序排列的，变量的取值由它的位置决定
 //而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
 //对象的解构赋值时下面形式的简写
 let {foo:foo,bar:bar}={foo:"aaa",bar:"bbb"};
 // 解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。
 // 真正被赋值的是后者，而不是前者

 let obj={
 	p:[
       "hello",
       {y:"World"}
 	]
 };
 let {p:[x,{y}]}=obj;

 const node={
 	loc:{
 		start:{
 			line:1,
 			column:5
 		}
 	}
 };
 let {loc,loc:{start},loc:{start:{line}}}=node;

 //下面是嵌套赋值的例子
  
 let obj={};
 let arr=[];
( { foo:obj.prop,bar:arr[0] }={foo:123,bar:true});
//对象的解构也可以指定默认值

var {x=3}={};
var {x,y=5}={x:1};
var {x:y=3}={};//y=3
var {x:y=3}={x；5};
var {message:msg='Something went wrong'}={};
//默认值生效的条件是，对象的属性值严格等于undefined
var {x=3}={x:undefined};
var {x=3}={x:null};

//如果解构失败，变量的值等于undefined

//如果解构模式是嵌套的对象，而且子对象所在的副属性不存在，那么将会报错
let {foo:{bar}}={baz:"baz"};
//解构时会报错，因为foo这时等于undefined，再取子属性就会报错
let x;
({x}={x:1});
//如果将一个已经声明的变量用于解构赋值，必须非常小心
//因为JS引擎会将{x}理解为代码块，从而发生语法错误
//只有不将大括号写在首行，避免JS将其解释为代码块，才能解决这个问题
//
//对象的解构赋值可以很方便地将现有对象的方法，赋值到某个变量
let {log,sin,cos}=Math;

//由于对象的本质是特殊的对象，因此可以对数组进行对象属性的解构
let arr=[1,2,3];
let {0:first,arr[arr.length-1]:last}=arr;


//3.字符串的解构赋值
//字符串也可以解构赋值，这是因为此时，字符串被转换成一个类似数组的对象
const [a,b,c,d,e]="hello";
//类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值
let {length:len}="hello";


//5. 函数参数的解构赋值

//函数的参数也可以使用解构赋值
function add([x,y]){
	return x+y;
}
//函数的参数也可以使用默认值
function move({x=0,y=0}={}){
	return [x,y];
}
//下面的写法会得到不一样的结果
function move({x,y}={x:0,y:0}){
	return [x,y];
}
//上面代码是为函数move的参数指定默认值，而不是为变量x和y指定默认值
//所以会得到与前一种写法不同的解构
//
//7.用途
//变量的解构赋值用途很多
// 1.交换变量的值
let x1=1;
let x2=2;
[x1,x2]=[x2,x1];
// 2.从函数返回多个值
// 函数只能返回一个值，如果要返回多个值，只能讲它们放在数组或对象里返回
// 有了解构赋值，取出这些值就非常方便
//返回一个数组
function example(){
	return [1,2,3];
}
let [a,b,c]=example();
//返回一个对象
function example(){
	return {
		foo:1, bar:2
	};
}
let {foo,bar}=example();

//函数参数的定义
// 解构赋值可以方便地将一组参数与变量名对应起来。
function f([x,y,z]){}
 f([1,2,3]);
 function f({x,y,z}){}
 f({x:3,y:2,z:1})

 let jsonData={
 	id:42,
 	status:"OK",
 	data:[222,111]
 }
 let {id,status,data:number}=jsonData;
 jQuery.ajax=function(url,{
 	async=true,
 	beforeSend=function(){},
 	cache=true,
 	crossDomain=false
 }={}){};