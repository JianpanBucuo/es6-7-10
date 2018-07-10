//Object

9.super
//我们知道，this关键字总是
//指向函数所在的当前对象
//es6又新增了另一个类似的关键字super
//指向当前对象的原型对象
const proto={
	foo:"hello"
};
const obj={
	foo:"world",
	find(){
		return super.foo;
	}
}
Object.setPrototypeOf(obj,proto);
obj.find();
//super关键字表示原型对象时，只能用在对象的方法之中，
//用在其他地方会报错
