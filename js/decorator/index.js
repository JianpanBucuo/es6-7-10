 //es3 代码实现装饰器

 

 var eat = function () {
 	console.log('吃饭');
 }

 var decorator = function (fn, afterfn) {
 		return  function () {
 			fn.apply(this,arguments);
 			afterfn.apply(this,arguments);
 		}
 }
 var wash = function () {
 	console.log('洗手');
 }
 var operate = decorator(eat, wash);

 // ES5下的装饰器模式
 let takePhoto = function () {
 	console.log('照相');
 }
 Object.defineProperty(takePhoto,'after',{
 	writable: true,
 	value: function() {
 		console.log('打开架子');
 	}
 })
 let aop = function (fn) {
 		return function () {
 			fn.after();
 			fn();

 		}
 }

 // 基于原型链和类的装饰器实现

 class Test {
 	takePhoto() {
 		console.log('照相');
 	}
 }

// var a = new Test();
// var b = Test.prototype.takePhoto;
// Test.prototype.takePhoto = function () {
// 	console.log('aftert');
// }
// b();


 function after (target,action, fn) {
 	let old = target.prototype[action];
 	if (old) {
 		target.prototype[action] = function () {
 			 
 			fn.apply(this);
 			old.apply(this);
 		}
 	}
 }

 // 用 AOP 函数修饰原函数
after(Test, 'takePhoto', () => {
    console.log('添加滤镜');
});

let t = new Test();
t.takePhoto();