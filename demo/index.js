/*
 * vue lazyload demo
 * By Gavin
 */

import Vue from 'vue';
import LazyLoad from '../src/lazyload.js';
import app from './app.js';

// 引入lazyload插件
Vue.use( LazyLoad, {
  defaultPic: './img/default.png'
});

// 生成vue实例
new Vue({
  el: '#app',
  render: h => h( app )
});
