# 前言 

前端时间在研究移动前端的适配方案，研究了下淘宝的rem适配方案，我这边的需求基本上都是营销类H5的适配，像淘宝那种完全适配宽度的方案在我这边不太适用，自己改了一些（emmmm，其实改了一多半）来满足我这边是适配需求。


#功能

1.主要适用于移动端强制横竖屏的情况  
常规情况下都是竖屏浏览H5，但是这个时候如果用户把手机进行横竖屏切换，需要保证UI能够完整显示（不过大多数的适配都是直接加个横竖屏切换的浮层，但是这样不是很友好），现在这样其实不管用户怎么转（用户可能很闲），都能够完美的适配到  

2.可以配置缩放策略，默认是no_border
缩放策略总共有三种：
    
    fixed_width     // 100%宽适配
    fixed_height    // 100%高适配
    no_border       // 自适应，不留白

3.增加了个resize的开关，在有些时候不希望屏幕resize   


```$xslt
   
   <script src="flexible.min.js"></script>
   
   <script>
       var flexible = new Flexible(640, 1008, 'no_border');
       // resize默认开启状态，调用switchResize可以进行切换，也可以传true||false进行设定
       flexible.switchResize();    
   </script>
```

#示例  
[强制竖屏](https://emeiziying.github.io/h5-flexible/examples/portrait/)  
[强制横屏](https://emeiziying.github.io/h5-flexible/examples/landscape/)  
[关闭resize](https://emeiziying.github.io/h5-flexible/examples/resize/)  
[100%宽适配](https://emeiziying.github.io/h5-flexible/examples/scalePolicy/fixed_width.html)  
[100%高适配](https://emeiziying.github.io/h5-flexible/examples/scalePolicy/fixed_height.html)  
[自适应，不留白](https://emeiziying.github.io/h5-flexible/examples/scalePolicy/no_border.html)  

# License

[MIT](https://github.com/emeiziying/h5-flexible/blob/master/LICENSE)