// Class可以通过extends关键字实现继承，
//这比ES5的通过修改原型链实现继承，要清晰和方便很多
class Point{};
class ColorPoint extends Point{

}
//上面代码定义了一个ColorPoint类，该类通过extends关键字，
//继承了Point类的所有属性和方法，
//但是由于没有部署任何代码，所以这两个类完全一样，
//等于复制了一个Point类
//下面，我们在ColorPoint内部加上代码

//

class Point{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	toString(){
		return "("+this.x+","+this.y+")";
	}
}

//
class Bar {
	doStuff(){
		console.log("stuff");
	}
}
var b=new Bar();

//构造函数的prototype属性，在ES6的类上面继续存在。
//事实上，类的所有方法都定义在类的prototype属性上面。

class Point{
	constructor(){},
	toString(){},
	toValue(){}
}

class Point(){
	constructor(){

	}
}
由于类的方法都定义在prototype对象上， 
所以类的新方法可以添加在prototype对象上面。
Object.assign()方法可以很方便地一次向类添加多个方法

 class Point(){
 	constructor(){}
 }
 Object.assign(Point,{
 	toString(){},
 	toValue(){}
 })

 class Foo{
 	constructor(){
 		return Object.create(null);
 	}
 }

 new Foo()


class Point{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	toString(){
		return "("+this.x+","+this.y+")";
	}
}
var point = new Point(2,3);


//Class 表达式

const MyClass = class Me {
	getClassName(){
		return this.name;
	}
}

采用Class表达式，可以写出立即执行的Class

let person= new class {
	constructor(name){
		this.name = name;
	}
	sayName(){
		console.log(this.name);
	}
}("Nic");

person.sayName(); //Nic

不存在变量提升

//this指向
类的方法内部如果含有this，
它默认指向类的实例。
但是必须非常小心，
一旦单独使用，很可能报错。

//与es5一样，在类的内部可以使用get和set关键字
//对某个属性设置寸值函数和取值函数
class MyClass{
	constructor(){}
	get prop(){
		return "getter";
	}
	set prop(value){
		console.log("setter"+ value);
	}
}

//存值函数和取值函数是设置在华苏醒的Desscriptor对象上的

class CustomHTMLElement {
	constructor (element) {
		this.element = element;
	}
	get HTML() {
		return this.element.innerHTML;
	}
	set HTML(value){
		this.element.innerHTML = value;
	}
}

//11. Class的Generator方法
?

//12.  Class的静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承
如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，
而是直接通过类来调用，这就称为 “静态方法”

class Foo {
	static classMethod(){
		return "hello";
	}
}
Foo.classMethod(); //"hello"

var foo = new Foo();
foo.classMethod(); // "error"

//注意，如果静态方法包含this关键字，这个this指的是类，
//而不是实例。

class Foo{
	static bar () {
		this.baz();
	}
    static baz () {
    	console.log("hello");
    }
    baz () {
    	console.log("world");
    }
}
//静态方法bar调用了this.baz，这里的this指的是Foo类，
//而不是Foo的实例，等同于调用Foo.baz
//另外从这个理智还可以看出，静态方法可以与非静态方法重名。