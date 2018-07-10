// Class可以通过extends关键字实现继承，
//这比ES5的通过修改原型链实现继承，要清晰和方便很多
class Point{};
class ColorPoint extends Point{

}
//上面代码定义了一个ColorPoint类，该类通过extends关键字，
//继承了Point类的所有属性和方法，
//但是由于没有部署任何代码，所以这两个类完全一样，
//等于复制了一个Point类
//下面，我们在ColorPoint内部加上代码
