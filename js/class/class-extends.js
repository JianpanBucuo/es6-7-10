Class的继承

Class 可以通过extends关键字实现继承，
这比ES5的通过修改原型链实现继承，要清晰和方便很多。

class Point　{

}

class ColorPoint extends Point {
	constructor(x, y, color){
		super(x, y);
		this.color = color;
	}
	toString() {
		return this.color + " " + super.toString();
	}
}
//上面代码中，constuctor方法和tostring方法之中，
//都出现了super关键字，它在这里表示父类的构造函数
//用来新建父类的this对象
class People {
     constructor (name,age) {
     	this.name = name;
     	this.age =age;
     }
     sayName(){
     	console.log("Hi My name is "+this.name);
     }
}
class Student extends People1 {
	constructor (name, age, room) {
		super(name, age);
		this.room = room;
	}
	sayHello() {
		console.log("name: "+this.name +"age"+ this.age + "room" + this.room);
		super.sayName();
	}
}

//子类必须在constructor方法中调用super方法。
否则新建实例时会报错。这是因为子类自己的this对象，
必须先通过父类的构造函数完成塑造，得到与父类相同的实例属性和方法
然后在对其进行加工。加上子类自己的实例属性和方法。
如果不调用super方法，子类就得不到this对象。

ES5的继承，实质是先创造子类的实例对象this，
然后再将父类的方法添加到this上面

ES6的继承机制完全不同，实质是将父类实例对象的属性和方法
加到this上面，然后再用子类的构造函数修改this

如果子类没有定义constructor方法，这个方法会被默认添加
代码如下，也就是说，不管有没有显示定义
任何一个子类都有constructor方法。

class ColorPoint extends Point {

}

class ColorPoint extends Point {
	constructor (...args) {
      super(...args);
	}
}
另一个需要注意的地方是，在子类的构造函数中，
只有调用super之后，才可以使用this关键字，
否则会报错。这是因为子类实例的构建，基于父类实例，
只有super方法才能调用父类实例

class Point {
	constructor(x,y) {
		this.x=x;
		this.y=y;
	}
}

class ColorPoint extends Point {
	constructor(x, y, color) {
		this.color = color;//Error
		super(x,y);
		this.color = color; //zhengque
	}
}
//
let cp = new ColorPoint(25, 8, "green");
cp instanceof ColorPoint //true
cp instanceof Point //true

//父类的静态FANGFA，也会被子类继承

class A {
	static hello() {
		console.log("Hello World!");
	}
}

class B extends A {

}

B.hello(); //hello world

2. 
Object.getPropertyOf()
//该方法用来从子类上获取父类
Object.getPropertyOf(ColorPoint) === Point
可以使用这个方法判断，一个类是否继承了另一个类

//3. super 关键字

super这个关键字，
1.即可以当作函数使用，也可以当作对象使用。
2.在这两种情况下，它的用法完全不同。

第一种情况，super作为函数调用时，代表父类的构造函数
ES6要求，子类的构造函数必须执行一次super函数

class A　{

}

class B extends A {
	constructor() {
		super();
	}
}

上面代码中，子类B的构造函数之中的super()，代表调用父类的
构造函数，这是必须的。

class A {
	constructor() {
		console.log(new.target.name);
	}
}

class B extends A {
	constructor() {
		super();
	}
}
new A() //A
new B() //B
super() 在这里相当于 A.prototype.constructor.call(this);

super()


class A {}
class B extends A {
	m() {
		super(); //error
	}
}

1. 代表父类的构造函数
2. 作为对象时，指向父类的原型对象，在静态方法中，指向父类。

class A {
	p() {
		return 2;
	}
}

class B extends A {
	constructor() {
		super();
		console.log(super.p());
	}
}

//需要注意，由于super指向父类的原型对象，
//所以定义在父类实例上的方法或属性，
//是无法通过super调用的。

//ES6规定，在子类普通方法中通过super调用父类的方法时，
// 方法内部的this指向当前的子类实例

class A {
	constructor() {
		this.x=1;
	}
	print() {
		console.log(x);
	}
}

class B extends A {
	constructor() {
		super();
		this.x = 2;
	}
	m() {
		super.print();
	}
}
let b = new B();
b.m(); //2 

//上面代码中，super.print()虽然调用的是
A.prototype.print()，但是 A.prototype.print()内部的this
指向子类B的实例，导致输出的是2, 而不是1 
也就是说，实际上执行的是 super.print.call(this);


由于this指向子类实例，所以如果通过super对某个属性赋值，
super就是this，赋值的属性会变成子类实例的属性

class A {
	constructor () {
		this.x = 1;
	}
}

class B extends A {
	constructor () {
		super();
		this.x = 2;
		super.x = 3;
		console.log(super.x);//undefined
		console.log(this.x); //3
	}
}

//如果super作为对象，用在静态方法之中，
//这时，super将指向父类，而不是父类的原型对象

class Parent {
	static myMethod(msg) {
		console.log("static",msg);
	}
	myMethod(msg) {
		console.log("instance",msg);
	}
}

class Child extends Parent {
	static myMethod(msg) {
		super.myMethod(msg);
	}
	myMethod(msg) {
		super.myMethod(msg);
	}
}
Child.myMethod(1); //static 1
var child = new CHild();
child.myMethod(2);//instance 2