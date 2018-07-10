//Function
//
//ES6允许为函数的参数设置默认值，即直接写在参数定义的后面
function log(x,y="World"){
	console.log(x,y);
}
//参数变量是默认声明的，所以不能用let或const再次声明
function foo(x=5){
	let x=1; //error
}
//参数默认值不是传值的，而是每次都重新计算默认值表达式的值，是惰性求值的
let x=99;
function foo(p=x+1){
	console.log(p);
}
//使用参数默认值时，函数不能有同名参数
foo();
//解构赋值与默认值的结合使用
// 与解构赋值默认值结合使用
//  参数默认值可以与解构赋值的默认值，结合起来使用
//  
function foo({x,y}){ console.log(x,y); }
function foo({x,y=5}={}){
  console.log(x,y);
}
//上面代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值。
//只有当函数foo的参数是一个参数时，x,y才会通过解构赋值生成，
//如果函数foo调用时没提供参数，x，y就不会生成，从而报错。
//通过提供函数参数的默认值，就可以避免这二中情况。
//上面代码指定，如果没有提供参数，函数foo的参数默认为一个空对象
function fetch(url,{body="",method="GET",headers={}}={}){
	console.log(method);
}

// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]

//参数默认值的位置
//通常情况下，定义了默认值的参数，应该是函数的尾参数
//因为这样比较容易看出来，到底省略了哪些参数
//如果非尾部的参数设置默认值，实际上这个参数是没法省略的
function f(x=1,y){
	return [x,y];
}
f() // 1,undefined
f(2)//2 undefined
f(,1) //error
f(undefined,2) // 1,2
 //除非显式输入undefined
 function foo(x=5,y=6){
 	console.log(x,y);
 }
 foo(undefined,null); // 5,null

 //函数的length属性
 // 指定了默认值之后，函数的length属性，将返回没有指定默认值的参数个数
 (function(a){}).length //1
 (function(a=4){}).length //0
 (function(a,b,c=2){}).length //2
 (function(...args){}).length // 0 
 //同理，后文的rest参数也不会计入length属性
 //如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了
 

 //作用域
 //
 //一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域
 //等到初始化结束，这个作用域就会消失，这种语法行为，不在设置参数默认值时，是不会出现的
 var x=1;
 function f(x=3,y=x){
 	console.log(y);
 }

 //下面一个例子
 let x=1;
 function f(y=x){
 	let x=2;
 	console.log(y);
 }
 //上面代码中，函数f调用时，参数y=x形成一个单独的作用域
 //在这个作用域里面，变量x本身没有定义，所以指向外层的全局变量x
 //函数调用时，函数体内部的局部变量x影响不到默认值变量x
//如果此时，全局变量x不存在，就会报错
function (y=x){
	let x=2;
	console.log(y);
}
f() // error
//如果参数的默认值是一个函数，该函数额作用域也遵守这个规则
let foo="outer";
function bar(func=()=>foo){
	let foo="inner";
	console.log(func());
}
bar();// outer

//应用
//利用参数默认值，可以指定某一个参数不得省略，否则就抛出一个错误
function throwIfMissing(){
	throw new Error("Missing parameter");
}
function foo(mustBeprovided=throwIfMissing()){
	return mustBeprovided;
}
//上面代码还可以看到，参数mustBeprovided的默认值等于throwIfMissing函数的运行结果（后面有圆括号）
//这表明参数的默认值不是定义时执行，而是在运行时执行，如果参数已经赋值，默认值中的函数就不会运行
//
//可以将参数默认值设置为undefined ，表明这个参数是可以省略的



//2. rest参数
//
//ES6引入rest参数(...name)，用于获取函数的多余参数
//这样就不需要arguments对象了，rest参数搭配的变量是一个数组
//该变量将多余的参数放入数组中
function add(...values){
	let sum=0;
	for(var val of values){
		sum+=val;
	}
	return sum;
}
//注意，rest参数之后不能再有其他参数，否则会报错
function f(a,...b,c){} //error
//函数的length属性，不包括rest参数
(function(a){}).length//1
(function(...a){}).length//0
(function(a,...b){}).length //1

//函数的name属性，返回该函数的函数名
//
//
var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"
const bar = function baz() {};

// ES5
bar.name // "baz"

// ES6
bar.name // "baz"

//箭头函数

var f= v=>v;
//等同于
var f=function(v){
	return v;
}
//如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分
var f=()=>5;
//等同于
var f=function(){return 5;}
var sum=(num1,num2)=>num1+num2;
var sum=function(num1,num2){return num1+num2};

//由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错
let getTempItem = id => ({id:id,name:"Temp"});

//如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不需要写大括号了
let fn= ()=>void doesNotReturn();

//箭头函数可以与变量解构结合使用
const full=({first,last})=>first + ' '+ last;
function full(person){
	return person.first + ' ' + person.last;
}
const isEven= n => n%2==0;
const square= n => n*2;

//箭头函数的一个用处是简化回调函数
[1,2,3].map(x=>x*x);

var result=values.sort(function(a,b){
          return a-b;
})
var result=values.sort((a,b)=>a-b);

//下面是rest参数与箭头函数结合的例子
const numbers=(...nums)=>nums;
const headTail= (head,...tail)=>[head,tail];
//箭头函数
//如果箭头函数多余一条语句，就要使用大括号将它们括起来，并且使用return语句返回
var sum=(num1,num2)=>{return sum1+sum2};

[1,2,3].map(x=>x*2);
var result=values.sort(function(a,b){
	return a-b;
})
var result=values.sort((a,b)=>a-b);

//rest参数与箭头函数结合的例子
const numbers=(...nums)=>nums;
const headAndTail=(head,...tail)=>[head,tail];

//箭头函数有几个使用注意点
//  1函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
//  2不可以当做构造函数，也就是说，不可以使用new命令，否则会抛出一个错误
//  3不可以使用arguments对象，该对象在函数体内不存在，如果要用，可以用rest参数代替
//  4不可以使用yield 命令
//   上面四点中，第一点尤其值得注意，this对象的指向是可变的，但是在箭头函数中，它是固定的

function foo(){

	setTimeout(()=>{console.log("id:"+this.id);},100);
}
var id=21;
foo.call({id:42});
//上面代码中，setTimeout的参数是一个箭头函数，
//这个箭头函数的定义是在foo函数生成时，而它的真正执行要等到100ms后，
//如果是普通函数，执行时this应该指向全局对象window，应该输出21
//但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是42）
// 箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域
function foo(){
	setTimeout(()=>{console.log("id:"+this.id);});
}
function foo(){
	var _this=this;
	setTimeout(function(){
		console.log("id:"+_this.id)
	})
}

//双冒号运算符
//箭头函数可以绑定this对象，大大减少了显式绑定this对象的写法，
//但是，箭头函数并不适用于所有场合，现在有一个提案，
//提出了双冒号运算符，用来取代call,apply,bind

//函数绑定运算符是并排的两排冒号::，双冒号左边是一个对象，右边是一个函数
//该运算符会自动将左边的对象，作为上下文环境（this对象），绑定到右边函数上面
foo::bar;
//等同于
bar.bind(foo);

foo::bar(...arguments);
//等同于
bar.apply(foo,arguments);

//什么是尾调用？
//尾调用是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚
//就是指某个函数的最后一个是调用另一个函数
function f(x){
	return g(x);
}

//以下三种情况，都不属于尾调用
function f(x){
	let y=g(x);
	return y;
}
function f(x){
	return g(x)+1;
}
function g(x){
	g(x);
}
//等同于
function f(x){
	g(x);
	return undefined;
}
//尾调用不一定出现在函数尾部，只要是最后一步操作即可
function f(x){
	if(x>0){return g(x);}
	return n(x);
}
//尾调用不一定出现在函数尾部，只要是最后一步操作即可
//上面代码中，函数m和n都属于尾调用，因为它们都是函数f的最后一步操作

//尾调用？