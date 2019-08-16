//String
//
//ES6为字符串添加了遍历器的接口
//使得字符串可以被for of 循环遍历
for( let codePoint of "foo"){
	console.log(codePoint);
}

//传统上，JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中
// ES6提供了三种新方法
let s="Hello World";
//includes()返回布尔值，表示是否找到了参数字符串
//startsWith() 返回布尔值，表示参数字符串是否在原字符串的头部
//endsWith() 返回布尔值，表示参数字符串是否在原字符串的尾部
s.startsWith("H");
s.endsWith("!");

//这三个方法都支持第二个参数，表示开始搜索的位置
s.startsWith("world",6);
s.endsWith("Hello",5);
//endsWith的行为与其他两个方法有所不同，它针对前n个字符，
// 而其他两个方法针对从第n个位置直到字符串结束。
// repeat()方法返回一个新字符串，表示将原字符串重复次
"x".repeat(3);
"hello".repeat("2");
//如果repeat的参数是负数或者Infinity 会报错
//
//9. padStart() padEnd()
// ES2017引入了字符串补全长度的功能，如果某个字符串不够指定长度，
// 会在头部或尾部补全
"x".padStart(5,"ab");
"x".padEnd(4,"ab");
// padStart 常用的功能是为数值补全指定位数
"1".padStart(10,"0");
//另一个通途是 提示字符串格式
"12".padStart(10,"YYYY-MM-DD");

//10.模板字符串
var basket={count:"aaa"};
$("#name").append(
`There are <b>${basket.count}</b> items in your basket are on sale!`
	)
// 模板字符串是增强版的字符串，用反引号``标识，它可以当做普通字符串使用
//  也可以用来定义多行字符串，或者在字符串中嵌入变量
//  如果要在模板字符串中使用引号，则前面要用反斜杠转移
let gretting=`\`World`;
//所有模板字符串的空格和换行，都是被保留的，比如<ul> 如果不想要这个换行，可以使用trim方法消除它
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>   
`.trim());
//需要把变量名写在 ${}之中    
//大括号内部可以放入任意的Javascript表达式，可以进行运算，以及引用对象属性
let x=1;
let y=3;
`${x}+${y}=${x+y}`;

let obj={x:1,y:2};
`${obj.x}+${obj.y}`

//模板字符串之中还能调用函数
function fn(){
	return "Hello World";
}
`foo ${fn()} bar`;

let template=`
     <ul>
      <% for(let i=0;i<data.supplies.length;i++){  %>
      	<li> <%= data.supplies[i]=%> </li>
        <% } %>
     </ul>
`
//13 标签模板
// 模板字符串可以紧跟在一个函数名后面， 该函数被调用来处理这个模板字符串
//  这被称为“标签模板”功能
//  alert`123`==alert(123)
//  但是，如果模板字符串里面有变量，就不是简单的调用了，
//  而是会将模板字符串先处理成多个参数，再调用函数
let a=5;
let b=10;
tag`Hello ${a+b} world ${a*b}`;
//等同于
tag(["Hello"," world",''],15,50);
//tag函数的第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分，
//也就是说，变量替换只发生在数组的第一个成员与第二个成员之间，第二个成员与第三个成员之间
//tag函数的其他参数，都是模板字符串各个变量被替换后的值


//14.String.raw()
//ES6还为原生的String对象提供了一个raw方法
//String.raw方法，往往用来充当模板字符串的处理函数
//返回一个斜杠都被转义的字符串，对应于替换变量后的模板字符串
//String.raw()方法也可以作为正常的函数使用，这时，它的第一个参数，应该是具有raw属性的对象
//且raw属性的值应该是一个数组
String.raw({raw:"test"},0,1,2);
//等同于
String.raw({raw:['t','e','s','t']},0,1,2);

//Number.EPSILON
//ES6在Number对象上面，新增了一个极小的常量 Number.EPSILON。
// 根据规定，它表示1与大于1的最小浮点之间的差
//Number.EPSLION实际上是Javascript能够表示的最小精度。
//误差如果小于这个值就可以认为已经没有意义了，即不存在误差了
function withinErrorMargin(left,right){
  return Math.abs(left,right)<Number.EPSILON*Math.pow(2,2);
}

//7.Math对象的扩展
Math.trunc(4.1) //用于去除一个数的小数部分，返回整数部分
//对于非数值，Math.trunc内部使用Number方法将其先转为数值
Math.trunc||function(x){
  return x<0 ? Math.ceil(x):Math.floor(x);
}
Math.sign()//方法用于判断一个数是到底是整数，负数，还是零，对于非数值，
//会将其转换为数值
Math.sign(-5)// -1
Math.sign(4)//1
Math.sign(-0)//0
Math.sign(NaN)//NaN

Math.cbrt() //方法用于计算一个数的立方根
Math.imul() //方法返回两个数已32位带符号整数形式相乘的结果 返回的也是一个32位的带符号整数
Math.hypot() //方法返回所有参数的平方和的平方根
Math.hypot(3,4) //
2**3==8;//true 指数运算符

