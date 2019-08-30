function Point(x, y) {
	this.x = x;
	this.y = y;
}
Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};
var p = new Point(1, 2);

class Point {
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	toString() {
		return '(' + this.x + ', ' + this.y + ')';
	}
}
// Object.assign 可以一次性在 构造函数原型上增加多个方法

Object.assign(Point.prototype, {
	toString() {

	},
	toValue() {
		
	}
})