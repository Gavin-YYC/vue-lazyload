## Vue lazyload for mobile web

* base on Vue 2.0
* support umd
* 1kb

### DEMO

View by phone mode in chrome:

https://gavin-yyc.github.io/vue-lazyload/demo/index.html

or scan：

![w200](http://img.youthol.top/eb2914ce57371d3b2951fc9e056bb3f4.png)

### Usage

```javascript
// assume you already use the Vue

// first
<script src="../build/lazyload.min.js" charset="utf-8"></script>

// then install directive
Vue.use( lazyload, {
  defaultPic: './img/default.png'
});

// last use case
<img v-lazy="item.imgurl">
```

### Build Project

#### Generate compressed version

```javascript
npm run build
```

#### Generate uncompressed version

```javascript
npm run dev
```
