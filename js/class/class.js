//Javascript语言中，生成实例对象的传统方法是
//通过构造函数
function Point(x,y){
	this.x=x;
	this.y=y;
}
Point.prototype.toString=function(){
	return "("+this.x+","+this.y+")";
}
var p= new Point(1,2);

//ES6提供了更接近传统语言的写法，引入了Class类
//这个概念，作为对象的模板，通过class关键字，可以定义类
//基本上es6的class可以看作只是一个语法糖，
//它的绝大部分功能，es5都可以做到
//新的class写法只是让对象原型的写法更加清晰
//更像面向对象编程的语法而已。
//上面的代码用es6的class改写，就是下面这样
class Point{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	toString(){
		return "("+this.x+","+this.y+")";
	}
}
//Point类除了构造方法，还定义了一个toString非那根发，
// 注意，定义类的方法的时候，前面不需要加上function
// 这个关键字，方法之间不需要逗号分隔，加了会报错
//使用的时候，也是直接对垒使用new命令
//跟构造函数的用法完全一致

class Bar{
	doStuff(){
		console.log("stuff");
	}
}

var b=new Bar();
b.doStuff();
//构造函数的prototyoe属性，在ES6的“类”
//上面继续存在，事实上，类的所有方法都
//定义在类的prototyoe属性上面

class Point{
	constructor(){}
	toString(){}
	toValue(){}
}
//等同于
Point.prototype={
	constructor(){},
	toString(){},
	toValue(){}
}
//在类的实例上面调用方法，
// 其实就是调用原型上的方法
class B{}
let b=new B();
b.constructor===B.prototype.constructor;

//由于类的方法都定义在prototype对象上面，
//所以类的新方法可以添加在prototype对象上面
//Object.assign方法可以很方便地一次向类添加多个方法

class Point{
	constructor(x,y){
		Object.assign(this,{x,y});
	}
}
Object.assign(someClass.prototype,{
	someMethod(){},
	anotherMethod(){}
})
//另外，类的内部所有定义的方法，都是不可枚举的
class Point{
	constructor(x,y){},
	toString(){}
}
Object.keys(Point.prototype);
//[]
Object.getOwnPropertyNames(Point.prototype);
//返回所有方法key值


var Point =function (x,y){};
Point.prototype.toString=function(){}
Object.keys(Point1.prototype);
["toString"]
//构造函数的原型方法可枚举

//严格模式
// 类和模块的内部，默认就是严格模式，
// 所以不需要使用use strict 指定运行模式，
// 只要你的低吗写在类或模块中，就只有严格模式可用

//constructor方法
// constuctor方法是类的默认方法，
// 通过new命令生成对象实例时，自动调用该方法
// 一个类必须有constructor方法，
// 如果没有显式定义，一个空的constructor非那根发会被默认添加

class Point{}
//等同于
class Point{
	constructor(){}
}

class Foo(){
	constructor(){
		return Object.create(null);
	}
}
new Foo() instanceof Foo;
//false
//上面代码中，construtor返回一个全新的对象，
//结果导致实例对象不是foo类的实例
//类必须使用new调用，否则会报错，这是它跟普通构造函数的一个汉族要区别
//后者不用new也可以执行

//5.Class表达式
// 与函数一样，类也可以使用表达式的形式定义
const MyClass=class Me{
	constructor(){}
	getClassName(){
		return Me.name;
	}
}
// 注意：这个类的名字是MyClass，而不是Me
// Me只在Class的内部代码可用，只代当前类

let inst=new MyClass();
inst.getClassName(); //Me
Me.name//error Me is not defined

//采用Class表达式，可以写出立即执行的Class

let person=new class{
	constructor(name){
		this.name=name;
	}
	sayName(){
		console.log(this.name);
	}
}("Nic");
//person是一个立即执行的类的实例

//6.不存在变量提升


class Logger{
	printName(name="there"){
		this.print('Hello ${name}');
	}
	print(text){
		console.log(text);
	}
}
const logger=new Logger();
const {printName}=logger;
printName();
//Cannot read property "print" of undefined
//上面代码中，printName方法中的this，
//默认指向Loggr类的实例，
//但是，如果将这个方法提取出来单独使用，this会指向
//该方法运行时所在的环境，因为找不到print方法而导致报错

//一个比较简单的解决方法是，在构造方法中绑定this
//这样就不会找不到print方法了
class Logger{
	constructor(){
		this.printName=this.printName.bind(this);
	}
}
//另一个解决方法是使用箭头函数
// 箭头函数体内的this对象，指向定义时所在的对象
//而不是使用时所在的对象

class Logger{
	constructor(){
		this.printName=(name='there')=>{
			this.print('Hello ${name}');
		}
	}
}

//9.name属性
//由于本质上，ES6的类只是es5的构造函数的一层包装，
//所以函数的许多特性都被Class继承，包括name属性
class Point{};
Point.name //"Point"

// ！！！ 11 Class 的Generator方法

//12.Class的静态方法
// 类相当于实例的原型，
// 所有在类中定义的方法，都会被实例继承，如果在一个方法前
// 加上static关键字，就表示该方法不会被实例继承
// 而是直接通过类来调用，这就称为静态方法

class Foo{
	static classMethod(){
		return "hello";
	}
}
Foo.classMethod();//hello
var foo=new Foo();
foo.classMethod();
//TypeError foo.classMethod is not a function
//注意：如果静态方法包含this关键字
//这个htis指的是类，而不是实例

class Foo{
	static bar(){
		this.baz();
	}
	static baz(){
		console.log("hello");
	}
	baz(){
		console.log("world");
	}
}
//静态方法bar调用了this.baz,这里的this指的是Foo类，
//而不是Foo的实例，等同于调用 Foo.baz
//从这个例子还可以看出，静态方法可以与非静态方法重名。
//父类的静态方法，可以被子类继承

class Foo{
	static classMethod(){
		return "hello";
	}
}
// ???? extends
class Bar extends Foo{

}


//13， Class的静态属性和实例属性
// 静态属性指的是Class本身的属性 即Class.propName,
// 而不是定义在实例对象 (this)上的属性
class Foo{ }
Foo.prop=1;
Foo.prop //1
//目前只有这一种写法可行，因为ES6明确规定。
// Class内部只有静态方法，没有静态属性

//以下两种写法都无效
class Foo{
	//写法1
	prop:2
    //写法2
    static prop:2
}
Foo.prop //undefined

//类的实例属性

//类的实例属性可以用等式，写入类的定义之中
class MyClass{
	myProp=42;
	constructor(){
		console.log(this.myProp);
	}
}
//有了新的写法之后，可以不在constructor方法里面定义

//类的静态属性
// 类的静态属性只要在上面的实例属性写法前面，加上static关键字就可以了
class MyClass {
	static myStaticProp=42;
	constructor(){
		console.log(MyClass.myStaticProp);
	}
}
//同样的，这个新写法大大方便了静态属性的表达
//老写法
class Foo{};
Foo.prop=1;
//新写法
class Foo{
	static prop=1;
}

14.  new.target属性
// new 是从构造函数生成实例对象的命令
//ES6为new命令引入了一个new.target属性
//该属性一般用在构造函数之中。
//返回new命令作用于的那个构造函数
//如果构造函数不是通过new命令调用的,
// new.target 会返回undefined，
// 因此这个属性可以用来确定构造函数是怎样调用的。

function Person(name){
	if(new.target!==undefined){
		this.name=name;
	}else{
		throw new Error("You must use new command to generate the example")
	}
}
//Class内部调用 new.target ，返回当前class
class Rectangle{
	constructor(length,width){
		console.log(new.target===Rectangle);
		this.length=length;
		this.width=width;
	}
}
var obj=new Rectangle(3,4);