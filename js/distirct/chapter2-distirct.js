// 变量的解构赋值

// 1.ES6允许按照一定模式，从数组合对象提取值，对变量进行弗值，被称为解构赋值。
let a = 1;
let b = 2;
let c = 3;

let [a, b, c] = [1, 2, 3];
//本质上，这种写法属于"模式匹配"，只要等号变量的模式相同，左边的变量就会被赋予对应的值。

let [foo, [[bar], baz]] = [1, [[2], 3]];
let [x, , y]=[1, 2, 3];
let [head, ...tail] = [1, 2, 3, 4];

//默认值 

//结构赋值允许指定默认值

let [foo = true] = [];

let [x, y = "b"] = ["a"];  //x="a" y="b"
let [x, y = "b"] = ["a", undefined];
//es6内部使用严格相等运算符 === 判断一个位置是否有值。所以当一个数组成员严格等于undefined，默认值才会生效。

如一个数组成员是null，默认值就不会生效，因为null不严格相等 undefined

如果默认值是有一个表达是，那么这个表达式是惰性求值得，即只有在用到的时候，才会求值。

let [x = f()] =[1];

if(x === undefined){
	x = f();
} else {
    x = [1][0];
}

//默认值可以引用结构赋值的其他变量，但该变量必须已经声明。

let [x = 1, y = x] = []; //x = 1; y=2;
let [x = 1, y = x] = [2]; // x=2;y=2;

//2, 对象的结构赋值
//解构不仅可以用于数组，还可以用于对象
let { foo, bar } = { foo: "aaa", bar: "bbb" };

//对象的解构与数组有一个重要的不同
//数组的元素是按次序排列的，
//变量的取值由它的位置由它的位置决定
//而对象的属性没有次序，变量必须与属性同名。

let { baz } = { foo: "aaa", bar: "bbb" };

//如果变量名与属性名不一致，必须写成下面这样

let {foo: baz} ={ foo: "aa", bar: "vvv" };

let obj = {first: "hello", last: "world"};

let {first: f, last:l} = obj;

//与数组一样，结构也可以用于嵌套结构的对象

let obj = {
	p: [
     "hello",
     {y:"world"}
	]
}
let { p:
	     [x,
	        {y}]
	    }        =obj;

const node = {
	loc :{
		start:{
			line: 1,
			column: 5
		}
	}
};
let {
	loc,
	 loc :{
	 	start
	 },
	 loc:{
	 	start:{
	 		line
	 	}
	 } 
}  = node;

//上面代码有三次解构赋值，分别是对loc,start,line三个
// 属性的结构赋值。注意，最后一次对line属性的解构赋值之中
//只有line是变量，loc和start都是模式，不是变量。

()