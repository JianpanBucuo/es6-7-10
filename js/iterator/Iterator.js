Javascript原有的表示“集合”的数据结构，主要有 Array Object，
ES6又添加了Map和Set。这样就有了四种数据集合。
用户还可以组合他们使用它们。 定义自己的数据结构。

遍历器Iterator就是这样一种机制。 
它是一种接口，为各种不同的数据结构提供统一的访问机制。
任何数据结构只要部署 Iterator接口，就可以完成遍历操作。

Iterator的作用有三个
 1. 为各种数据结构，提供一个统一的，简便的访问接口。
 2. 使得数据结构的成员能够按某种次序排列。
 3. ES6创造了一种新的遍历命令， for of 。 Iterator接口主要供 for of 消费。

 Iterator的遍历过程大概是这样的。

 1. 创建一个指针对象，指向当前数据结构的起始位置。 
 	遍历器对象本质上，就是一个指针对象
 
 2. 第一次调用指针对象的 next 方法，可以将指针对象指向数据结构的第一个成员。

 3. 第二次调用指针对象的 next 方法，可以将指针对象指向数据结构的第二个成员。

 4. 不断调用 next 方法， 直到它指向数据结构的结束位置。

 每一次调用 next 方法，都会返回数据结构的当前成员的信息。具体来说，就是返回
 一个包含 value 和 done 两个属性的对象。 

value属性是当前成员的值。 done属性是一个布尔值。 表示遍历是否结束。

function makeIterator ( array ) {
   var nextIndex = 0;
   return {
   	 next:function () {
   	 	return nextIndex < array.length ? { value: array[nextIndex++], done:false }: { value: undefined, done: true }
   	 }
   }
}

上面代码定义了一个 makeIterator函数，它是一个遍历器生成函数。
作用就是返回一个遍历器对象。
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }


let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }


function createIterator (items) {
	var i = 0;
	return {
		next: function () {
			return i <items.length ? { done:false, value : items[i++]  } : { done:true , value: undefined};
		}
	}
}

// 在es6种，迭代器的编写规则也同样复杂，但es6同时还引入了一个生成器对象，它可以让创建迭代器对象的过程变得更简单
//生成器是一种返回迭代器的函数，通过function关键字的(*)来表示，，
//函数中会用到新的关键字yield。星号可以紧挨着function和

function *createIterator () {
	yield 1;
	yield 2;
	yield 3;
}

function *createIterator (items) {
     for ( let i = 0; i<items.length; i++ ){
     	yield  items[i];
     }
}

let createIterator =  function *(items) {
	for (let i = 0; items.length; i++ ){
		yield [i];
	}
}

let o = {
		  *createIterator   (items) {
			for ( let i =0 ; i< items.length ; i++) {
				yield items[i];
			}
		}
}

function isIterable (Object) {
	return typeof Object[Symbol.iterator]  === "function";
}