// Promise 是 异步编程的一种解决方案，比传统的解决方案-- 回调函数和事件 -- 更合理和更强大
//Promise，简单来说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果，
//从它可以获取异步操作的消息，Promise提供统一的API

//Promise对象有两个特点
// 1.对象的状态不受外界影响，Promise对象代表一个异步操作，有三种状态
// pending, fullfilled, rejected。 只有异步操作的结果，可以决定当前是哪一种状态
//任何其他操作都无法改变这个状态

// 2.一旦状态改变，就不会再改变，任何时候都可以得到这个结果。
// Promise对象的改变，自由两种可能 pending变为 fullfilled/rejected
//只要这两种情况发生，状态就凝固了，不会再变了。


//基本用法

//es6规定， promise对象是一个构造函数，用来创建Promise 实例

//下面代码创建了一个Promise实例

const promise = new Promise(function(resolve,reject) {
	if( /*异步操作成功*/){
		resolve(value);
	}else{
		reject(error);
	}
})

promise.then(
  function() {
  	//reslove
  },
	function() {
		//reject
	})

function timeOut (ms) {
   return new Promise ((resolve,reject)=>{
        setTimeout(resolve,ms,"done");
   }) 
}

timeout(100).then((value)=>{
	console.log(value);
})

//Promise 新建后就会立即执行

let promise = new Promise ((resolve,reject) =>{
          console.log("Promise");
          resolve();
})
promise.then(()=>{
	console.log("resolved");
})
console.log("Hi");


function want () {
	console.log("It's you want");
}

// function fn
// 数据请求和数据处理区分开来

function want ( ) {
	console.log("It's you want" );
}
function fn (want) {
	want && want();
}

function fn (want) {
	console.log("Amout of code");
	return new Promise ( function (resolve, reject) {
		  if (typeof want === "function"){
		  	resolve(want);
		  }
		  else {
		  	reject("it's not a function");
		  }
	} )
}

new Promise (function (resolve, reject) {
	if(true) {
		resolve();
	}
		else {
			resject();
		}
})

function fn ( num ) {
	return new Promise ((resolve,reject) => {
		if ( typeof num === "number") {
			resolve();
		}else{
			reject();
		}
	}).then(() => {
		console.log("It's number");
	}, () => {
		console.log("It's not a number");
	})
}

var fn = (num) => {
   return new Promise((resolve,reject) => {
   	if (typeof num === "number"){
   		resolve(num);
   	}else	{
   		reject(num);
   	}
   })
}
fn("aaa").then((num)=>{ console.log(num + 1); },() =>{console.log("It's not a number")})


var url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';
var url1 = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-03-26/2017-06-10';

 function renderAll () {
 	return Promise.all([getJSON(url),getJSON(url1)]);
 }

 renderAll().then(function (value) {
 	console.log(value);
 })

 promise.all,promise.race 都是以一个promise对象组成的数组作为参数，
 不同的是 只要数组中的其中一个promise状态改变的时候，就可以调用 ( .then ) 方法了
  