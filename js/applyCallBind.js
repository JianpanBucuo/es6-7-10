// apply call bind
// JS中，这三者都是用来改变函数的this对象的指向的

1.都是用来改变函数的this对象的指向的
2.第一个参数都是this要指向的对戏那个
3.都可以利用后续参数传参

var xw={
	name:"Nic",
	gender:"male",
	age:"25",
	say:function(){
		this.name+","+this.gender+","+this.age;
	}
}
var hx={
	name:"Grey",
	gender:"female",
	age:"18"
}
// xw.say.call(hx);
// xw.say.apply(hx);
// xw.say.bind(hx)();

//如果直接写xw.say.bind(xh)是不会有任何结果的，
call和apply都是对函数的直接调用，而bind方法返回的仍然是一个函数。
因此后面还需要()来进行调用才可以。

apply和call有什么区别呢？我们稍微修改一下

var xw={
	name:"Nic",
	gender:"male",
	age:"24",
	say:function(school,grade){
       console.log(this.name + " , " + this.gender + " ,今年" + this.age + " ,在" + school + "上" + grade);          

	}
}
var xh={
	name:"Red",
	age:18,
	gender:"female"
}
// xw.say.call(xh,"实验小学","六年级");       
// xw.say.apply(xh,["实验小学","六年级郑州牛皮癣医院"]);
// call后面的参数与say方法中是一一对应的
// 而apply的第二个从那书是一个数组，
// 数组中的元素和say方法中一一对应的
// bind的传参方法和call一样