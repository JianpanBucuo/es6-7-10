//数组
//
//扩展运算符是(...)，它好比rest参数的逆运算
//
//该运算符主要用于函数调用

function push(array,...items){ //rest 参数
	array.push(...items); // 扩展运算符
}

function add(x,y){
	return x+y;
}
const numbers=[4,34];
add(...numbers);

//扩展运算符与正常的函数参数可以结合使用
function f(v,w,x,y,z){
	
}
const args=[0,1];
	f(-1,...args,2,...[3]);
//扩展运算符后面可以防止表达式
const arr=[
    ...(x>0?["a"],[]),"b"
]
[...[],1]
//如果扩展运算符后面是一个空数组，则不产生任何效果
//
//替代函数的apply方法
//由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了
//ES5
function f(x,y,z){}
var args=[0,1,2];
f.apply(null,args);
//ES6
f(...args);
//下面是扩展运算符取代apply方法的例子
Math.max.apply(null,[13,3,22]);
Math.max(...[21,2,22])

//通过push函数，将数组添加到另一个函数尾部
let arr1=[1,2,3];
let arr2=[3,4,5];
arr1.push(...arr2);

//扩展运算符的应用
//复制数组
//数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，
//而不是克隆一个全新的数组
const a1=[1,2];
const a2=a1;
ar[0]=2;
a1 //[2,2];
//上面代码中a2并不是a1的克隆，而是指向同一份数据的另一个指针。修改a2，会直接导致a1的变化
//ES5只能用变通的方法来复制数组
const a1=[1,2];
const a2=a1.concat();
//上面代码中，a1会返回原数组的克隆，在修改a2就不会对a1产生影响
//扩展运算符提供额复制数组的简便写法
const a1=[1,2];
const a2=[...a1];
const [...a2]=a1;

//合并数组
let more=[1,2,34];
 //es5
 [1,2].concat(more);
//es6
[1,2,...more];
var arr1=["a","b"];
var arr2=["c"];
var arr3=["d","e"];
arr1.concat(arr2,arr3);
[...arr1,...arr2,...arr3];

//与解构赋值结合
//扩展运算符可以与解构赋值结合起来，用于生成数组
//es5
a=list[0];
rest=list.slice(1);
//es6
[a,...list]=list;

const [first,...rest]=[1,2,3,5];

const [first,...rest]=[];
const [first,...rest]=["foo"];
//first="foo", rest=[]
//如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错
//
//4.扩展运算符哈可以将字符串转为真正的数组
[..."hello"];

//(5) 实现了Iterator 接口的对象
//任何Iterator接口的对象，都可以用扩展运算符转为真正的数组
let nodeList=document.querySelectorAll("div");
//上面代码中，querySelectorAll方法返回得事一个nodelist对象，它不是数组
//而是一个类似数组的对象，这时，扩展运算符可以将其转为真正的数组
//原因就在于Nodelist对象实现了Iterator

//6.Map和Set结构，Generator函数 ？
//
//
//
//
//二 
// Array.from()
// Array.from方法用于将两类对象转为真正的数组：
// 类似数组的对象(array-like object) 和可遍历(iterable)的对象（包括ES6新增的数组结构Set和Map）
// 
let arrayLike={
	"0":"a",
	"1":"b",
	"2":"c",
	length:3

};
//es5
var arr1=[].slice.call(arrayLike);
//es6
var arr2=Array.from(arrayLike);
//实际操作中，常见的类似数组的对象时DOM操作返回的nodeList集合
//以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组
let ps=document.querySelectorAll("p");
Array.from(ps).filter(p=>{return p.textContent.length>100});
//如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组
Array.from([1,2,4]);
//值得提醒的是，扩展运算符(...)也可以将某些数据结构转为数组
function foo(){
	const args=[...arguments];
}
[...document.querySelectorAll("div")];

//Array.from方法还支持类似数组的对象，所谓类似数组的对象，本质特征只有一点，即必须有length属性
//因此，任何有length属性的对象，都可以通过Array.from方法转为数组
Array.from({length:3});
//Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组
Array.from(arrayLike,x=>x*x);
Array.from(arrayLike).map(x=>x*x);
Array.from.([1,2,3],(x)=>x*x);

//下面的 例子将数组中布尔值为false的成员转为0
let spans=document.querySelectorAll("span.name");
let names1=Array.prototype.map.call(spans,s=>s.textContent);
let names2=Array.from(spans,s=>s.textContent);

//apply call 
// 1.每隔函数都包含两个非继承而来的方法： call() apply()
// 都是在特定的作用域中调用函数，等于设置函数体内this对象的值，以扩充函数赖以运行的作用域
// 一般来说，this总是指向调用某个方法的对象，
// 但是使用call和apply方法时，就会改变this的指向
// 例一
window.color="red";
document.color="yellow";
var s1={color:"blue"};
function changeColor(){
	console.log(this.color);
}
changeColor.call();//red
changeColor.call(window) //red
changeColor.call(document) //yellow
changeColor.call(s1) //blue
var Pet={
	words:"...",
	speak:function(say){
		console.log(say+""+this.words);
	}
}
Pet.spaek("Speak"); // Speak ...
var Dog={
	words:"Wang",
}
Pet.spaek.call(Dog,"Speak");
//this的指向改变成了Dog 结果：SpeakWang

//例二
function Pet(words){
	this.words=words;
	this.spaek=function(){
		console.log(this.words);
	}
}
function Dog(words){
	Pet.call(this,words);
	Pet.apply(this,arguments);
}

//apply方法接收两个参数，一个是函数运行的作用域，另一个是参数数组
//调用一个对象的一个方法
//另一个对象替换当前对象
apply([thisObj [,argArray] ]);
//如果argArray不是一个有效数组或不是arguments对象，拿奖导致一个TypeError，
//如果没有提供argArray和thisObj任何一个参数，那么Global对象将用作thisObj
// call方法第一个参数和apply方法一样，但是传递给函数的参数必须列举出来
// 