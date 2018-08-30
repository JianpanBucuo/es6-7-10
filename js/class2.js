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