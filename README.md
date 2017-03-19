## VUE 图片懒加载

### DEMO

用手机预览模式看：

https://gavin-yyc.github.io/vue-lazyload/demo/index.html

或扫码：

![w200](http://img.youthol.top/eb2914ce57371d3b2951fc9e056bb3f4.png)

### 使用

```javascript
// 第一步 引入
<script src="../build/lazyload.min.js" charset="utf-8"></script>

// 第二步 导入指令
Vue.use( lazyload, {
  defaultPic: './img/default.png'
});

// 第三步 使用
// 需要懒加载的图片添加v-lazy指令
<img :src="item.imgurl" v-lazy>
```

### 项目构建

#### 生成压缩版

```javascript
npm run build
```

#### 不压缩

```javascript
npm run dev
```
