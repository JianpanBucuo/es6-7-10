//默认情况下，浏览器是同步加载javascript脚本
//即渲染引擎遇到<script>标签就会停下来
//等到执行完脚本，再继续向下渲染。
//如果是外部脚本，还必须加入脚本下载的时间
//如果脚本体积很大，下载和执行的时间就会很长
//因为造成浏览器堵塞，用户会感觉到浏览器卡死了，
//没有任何响应，这显然是很不好的体验

//<script src="path/to/myModule.js" defer></script>
//<script src="path/to/myModule.js" async></script>

上面代码中script标签打开defer或async属性，
脚本就会异步加载，渲染引擎遇到这一行命令，就会开始下载外部脚本
但不会等它下载完或执行，而是直接执行后面的命令

defer 与 async 的区别是
defer要等到整个页面在内存中正常渲染结束才会执行，
async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，
再继续渲染。
defer是 “渲染完再执行”
async是 “下载完就执行”
如果页面中有多个defer脚本，会按照它们在页面中出现的顺序加载。
而多个async脚本式不能保证加载顺序的。