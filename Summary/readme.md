# 学习中的一点总结

## 一、关于MVVM框架

[可伸缩的同构Javascript代码》](http://efe.baidu.com/blog/isomorphic/)下面是自己的总结，后面希望重温一下这篇文章。

MVC指的是:Model-View-Controller(模型-视图-控制器)，现在我还有点蒙，这个东西是什么呢？现在你就记住他是一种设计模式。

设计模式在应用开发中相当重要。他们概述、封装了应用程序及其环境中值得关注的地方。

首先看一下目前的一些模式。
#### MVC：(Model-View-Controller)
##### MVC
![](http://efe.baidu.com/blog/isomorphic/img/mvc.png)
MVC的意思就是软件可以分为三个部分：
视图（View）：用户界面
控制器（Controller）：业务逻辑
模型（model）：数据保存
通信如下：
1. View 传送指令到 Controller
2. Controller 完成业务逻辑后，要求 Model 改变状态
3. Model 将新的数据发送到 View，用户得到反馈

注意这是单向传递的。
##### 互动模式
接受用户指令时，MVC可以分为两种模式，一种是通过View接收指令传递给Controller。另一种直接通过controller接受指令。

##### 实例：backBone
![](http://efe.baidu.com/blog/isomorphic/img/backbone.png)

#### Model2 
![](http://efe.baidu.com/blog/isomorphic/img/model2.png)
这个是比较老的，1999年的设计模式。大家对这个框架的共识是：富Model 瘦Controlle。 虽然这并不适用于所有的应用。但是由于传统MVC中的Controller需要监听View并对输入做出反应，Controller会趋于繁重（比如愈来愈多的业务逻辑），因此“富Model 瘦Controller”的方式看上去更好。

鉴于无状态的HTTP，Model2的View还是很短暂的：不同请求之间，View不保持状态。在大多数服务器端框架中，应用的状态都是通过Session Cokies存储的。这使得Contrller和View之间的单向通信非常有序，但却不利于前端的开发。

1. 用户可以向 View 发送指令（DOM 事件），再由 View 直接要求 Model 改变状态。
2. 用户也可以直接向 Controller 发送指令（改变 URL 触发 hashChange 事件），再由 Controller 发送给 View。
3. Controller 非常薄，只起到路由的作用，而 View 非常厚，业务逻辑都部署在 View。所以，Backbone 索性取消了 Controller，只保留一个 Router（路由器） 。
#### MVP（Model-View-presenter）
![](http://efe.baidu.com/blog/isomorphic/img/mvp.png)

#### MVVM

![](http://efe.baidu.com/blog/isomorphic/img/mvvm.png)
![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020110.png)

将MVPPresenter改名为ViewModel，基本与MVP模式一致。
唯一的区别是MVVM采用的是双向绑定！View的变动，自动反应在ViewModel，反之亦然。可以把ViewModel说成View的Model。

而这个项目就是用MVVM来实现。

## 二、 实现MVVM模式

#### 1. 构建ViewModel：

现在重新审视MVVC模式，他是这样工作的：

1. 用户的交互界面发生改变（View）
2. 通过ViewModel操作数据（改变Model）
3. 同时ViewModel也可以挟持这种数据的改变
4. ViewModel就可以根据数据渲染界面（view）
![](http://upload-images.jianshu.io/upload_images/271046-8e59f41b85e02cfd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2. 劫持数据的变化

defineProperty():属性发生改变后，用get，set方法进行劫持

1. 对于属性的劫持：
```
let val = obj[key];//某一对象的属性

Object.defineProperty(obj,key,{
	enumerable: true;
	confirgurable:true;
	//通过get和set方法劫持
	get: () => val;//返回属性的数据
	set: current => {
		if(current!==val) {
			callback(current,val);//将新值和老值都传递给监听的回调函数里。
		}
		val = current;
	}
});
```
2. 对于方法的劫持
```
ObserveArray(arr,callback) {
	const methods = ["push","pop","unshift","sort","reverse","splice"];
	const arrayProto = Array.prototype;
	const delegatePrototype = Object.create(Array.prototype);
	methods.forEach(method => {
		Object.defineProperty(delegatePrototype,method,{
			writable:true;
			enumerable: true;
			configurable:true;
			value(...arg) {
				let var = [...arr];
				let current = arrayProto[method].call(this,...arg);
				callback(current,val,...arg);
				return current;
			}
		});
	});
	arr._proto_ = delegatePrototype;
}


## 三、 ES6：箭头函数

ES6 允许使用“箭头”（`=>"`）定义函数.
正常格式如下；
```
var sum = (num1,num2) => {
	//函数体
	return num1 + num2;
};
```
等同于ES5下面的函数声明：
```
function sum(num1,num2) {
	//函数声明
	return num1 + num2;
}
```
也等同于ES5的函数表达式：
```
var sum = function(num1,num2) {
	//函数体
	return num1 + num2;
};
```
箭头函数可以缩写，规则如下：
1. 只有一个参数时，()可以省略
2. 函数体中只有返回语句，则可以省略`{}`和`return`
```
var f = v => v;
```
等同于：
```
function f(v) {
	return v;
}
```
或者等同于：

```
var f = (v) => {
	return v;
};
```

## 四、ES6 let和const
#### 1. JS没有块级作用域
文章来源：![《点此链接》](http://www.infoq.com/cn/articles/es6-in-depth-let-and-const)
在ES5中用var来声明一个变量，它的作用域就是函数所在的定义域，而不是块级作用域。
由此可以引发如下的bug：
```
function runTowerExperiment(tower,startTime) {
	var t = startTime;
	tower.on("tick",function() {
		...使用了t的代码
	});
	...更多代码...
}
```
到目前为止都很顺利。现在你想添加测量保龄球速度的功能，所以你在回调函数内部添加了一个简单的if语句。
```
function runTowerExperiment(tower,startTime) {
	var t = startTime;
	tower.on("tick",function() {
		...使用了变量t的代码...
		if(bowlingBall.altitude()<=0) {
			var t = readTachymeter();
			...
		}
	});
	...更多代码....
}
```
现在你无意中添加了第二个变量t，这里的t指向的是一个新的内部变量t而不是原来的外部变量。

let是更完美的let，在ES6的新代码模式下，你应该停止使用var声明变量，能用let就用let吧。以下是let的新特点：
1. let声明的变量具有块级作用域。
2. let声明的全局变量不是全局对象的属性。
3. let声明的变量直到控制流到达该变量被定义的代码行才会被加载，所以在到达之前使用该变量会触发错误。
## 五、create方法
此方法会会使用指定的原型对象及其属性去创建一个新的对象。

