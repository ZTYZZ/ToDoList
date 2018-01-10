# 学习中的一点总结

## 关于MVVM框架

[可伸缩的同构Javascript代码》](http://efe.baidu.com/blog/isomorphic/)下面是自己的总结，后面希望重温一下这篇文章。

MVC指的是:Model-View-Controller(模型-视图-控制器)，现在我还有点蒙，这个东西是什么呢？现在你就记住他是一种设计模式。

设计模式在应用开发中相当重要。他们概述、封装了应用程序及其环境中值得关注的地方。

首先看一下目前的一些模式。
#### MVC：(Model-View-Controller)
##### MVC
http://efe.baidu.com/blog/isomorphic/img/mvc.png
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