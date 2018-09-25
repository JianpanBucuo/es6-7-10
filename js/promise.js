// Promise
//promise是异步变成的一种解决方案，
//比传统的解决方案，回调函数和事件。更合理和强大。
//
//所谓promise，简单说就是一个容器，里面保存着某个未来才会结束的事件。
//从语法上说，Promise是一个对象，从它可以获取异步操作的消息。
//Promise提供统一的API，
function runAsync () {
	var p = new Promise(function(resolve,reject){
		setTimeout(function () {
			console.log("执行完成");
			resolve("随便什么数据");
		},2000);
	})
	return p;
}
runAsync();

runAsync().then(function(data){
	console.log(data);
})

const promise =new Promise (function(reslove,reject){
	//...some code
	if(/*异步操作成功*/){
		reslove(value);
	}else{
		reject(error);
	}

})

promise.then(function (value){

},function (err){
	
})


//所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
//从语法上说，Promise是一个对象，从它可以获取异步操作的消息。
//Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。

Promise 对象有两个特点
 1.对象的状态不受外界影响。 promise对象代表一个异步操作，有三种状态:
   pending(进行中) fulfilled(以成功) 和 rejected(以失败)
   只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
 2.一旦状态改变，就不会再变，任何时候都可以得到这个结果。
 pending -> fulfilled  pending -> rejected。
 只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。

 有了promise对象，就可以将异步操作以同步操作的流程表达出来，避免层层嵌套的回调函数。
 此外，promise对象提供统一的接口，使得控制异步更加容易。

 //es6规定，promise对象是一个构造函数，用来生成promise实例

 下面代码创造了一个promise实例

 const promise = new Promise (function (reslove, reject) {
 	if(success) {
 		reslove(value);
 	}else {
 		reject(error);
 	}
 })

 promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。 
 他们是两个函数

 resolve函数的作用是，将promise对象的状态从"未完成"变成成功
 在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。

 let promise = new Promise ( (resolve, reject) =>{
 	if(success) {
 		resolve(a);
 	} else {
        reject(error);
 	}
 })


 function promise () {
 	 return new Promise (function (resolve, reject) {
 	 	if ( success ) {
 	 		resolve (a);
 	 	} else {
 	 		reject (err);
 	 	}
 	 })
 }

 Promise.prototype.then();
 Promise.prototype.catch();

 promise.then(
    ()=>{console.log("this is success callback");},
    ()=>{console.log("this is fall callback")}
 	)