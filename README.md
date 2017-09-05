# h5-flexible  

主要适用于移动端强制横竖屏的情况

比如目标分辨率为640*1008，在手机打开的时候，如果设备是横屏状态，会自动将body旋转90deg，
使得内容样式依旧为竖屏状态

增加了个resize的开关，在有些时候不希望屏幕resize  

```$xslt
   
   <script src="flexible.min.js"></script>
   
   <script>
       var flexible = new Flexible(640, 1008);
       // resize默认开启状态，调用switchResize可以进行切换，也可以传true||false进行设定
       flexible.switchResize();    
   </script>
```

## Examples  
[强制横屏](./examples/portrait/)  
[强制竖屏](./examples/landscape/)  
[关闭resize](./examples/resize/)  