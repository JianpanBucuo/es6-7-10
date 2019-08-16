//es6允许使用“箭头” 定义函数

var f = v => v;
//等同于
function f(v) {
	return v;
}
//如果箭头函数不需要参数或需要多个参数，就使用一个括号代表参数部分

var f = () => 5;
//等同于
function f() {
	return 5;
}

var sum = (num1, num2) => num1 + num2;

function (num1, num2) {
	return num1 + num2;
}
由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错

let getTempItem = id => ({ id: id, name: "temp" });

//箭头函数可以与变量结构结合使用

const full = ({first, last}) => first + " "　+ last ;
//等同于
function full (person) {
	return person.first + " " + person.last;
}
//箭头函数使得表达更加简洁
const isEven = n => n%2 == 0;
const square = n => n * n;

//下面是rest参数与箭头参数结合的例子

const numbers = (...nums) => nums;
numbers(1,2,4,4); //[1,2,4,4]
const headTail = (head,...tail) => [head,tail];

//箭头函数有几个使用注意点
函数体内的ethis对象，就是定义时所在的对象，而不是使用时所在的对象
不可以当作构造函数
不可以使用arguments对象，该对象在函数体内不存在，如果要用，可以用rest参数代替。
不可以使用yield命令 