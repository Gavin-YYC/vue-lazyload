
import Vue from 'vue';

import LazyLoad from './lazyload.js';


// 引入lazyload插件
Vue.use( LazyLoad, {
  defaultPic: './img/default.png'
});

const template = '<div class="container">'
  + '<img src="http://ygres-test.lsh123.com/0acdf2539c8483e69662e7@240h_540w" v-lazy>'
  + '<img src="http://ygres-test.lsh123.com/3a7a5afc9726cf73ecb58d@240h_540w" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="http://ygres-test.lsh123.com/fca956e217633d188cde4d@720h_720w" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="http://ygres-test.lsh123.com/0acdf2539c8483e69662e7@240h_540w" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  + '<img src="./img/test.png" v-lazy>'
  '</div>';

// 生成vue实例
const app = new Vue({
  el: '#app',
  template: template
});
