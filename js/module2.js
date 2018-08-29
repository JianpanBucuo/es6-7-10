//默认情况下，浏览器是同步加载javascript脚本
//即渲染引擎遇到<script>标签就会停下来
//等到执行完脚本，再继续向下渲染。
//如果是外部脚本，还必须加入脚本下载的时间
//如果脚本体积很大，下载和执行的时间就会很长
//因为造成浏览器堵塞，用户会感觉到浏览器卡死了，
//没有任何响应，这显然是很不好的体验

//<script src="path/to/myModule.js" defer></script>
//<script src="path/to/myModule.js" async></script>

// 上面代码中script标签打开defer或async属性，
// 脚本就会异步加载，渲染引擎遇到这一行命令，就会开始下载外部脚本
// 但不会等它下载完或执行，而是直接执行后面的命令

// defer 与 async 的区别是
// defer要等到整个页面在内存中正常渲染结束才会执行，
// async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，
// 再继续渲染。
// defer是 “渲染完再执行”
// async是 “下载完就执行”
// 如果页面中有多个defer脚本，会按照它们在页面中出现的顺序加载。
// 而多个async脚本式不能保证加载顺序的。

//加载规则

// 浏览器加载ES6模块，也是用<script>标签，
// 但是要加入 type="module"属性
// // <script type="module" src="./foo.js"></script> 
// 上面代码在网页中插入一个模块 foo.js,
// 由于type属性设为module,所以浏览器知道这是一个ES6模块
// 浏览器对于带有type="module"的script，都是异步加载
// 不会造成堵塞浏览器，即等到整个页面渲染完，
// 再执行模块脚本，等同于打开了script标签的defer属性
// 一旦使用了async属性，
// <script type="module">就不会按照在页面出现的
// 顺序执行，而是只要该模块加载完成，就执行该模块

对于外部的模块脚本，有几点需要注意：
 1.代码是在模块作用域之中运行，而不是在全局作用域运行，
  模块内部的顶层变量，外部不可见
 2.模块脚本自动采用严格模式，不管有没有生命use strict
 3.模块之中，可以使用import命令加载其他模块 (.js后缀不可省略)
 需要提供绝对url或相对url，也可以使用export命令输出对外接口
4.模块之中，顶层的this关键字返回undefined，而不是指向window
5.同一个模块如果加载多次，将只执行一次 


二 ： ES6模块与commonJS模块的差异

Commonjs模块输出的是一个值得拷贝
ES6模块输出的是值得引用

Commonjs模块是运行时加载
ES6模块是编译时输出接口

第二个差异是因为Commonjs加载的是一个对象，
该对象只有在脚本运行完才会生成
而ES6模块不是对象，它的对象只是一种静态定义，
在代码静态解析阶段就会生成