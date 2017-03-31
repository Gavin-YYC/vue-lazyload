(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.lazyload = factory());
}(this, (function () { 'use strict';

var utils = {
  throttle: function throttle(fn, delay) {
    var timer = null;
    var lastRunAt = 0;
    return function () {
      if (timer) {
        return;
      }
      var timeDiff = Date.now() - lastRunAt;
      var context = this;
      var args = arguments;
      var runCallback = function runCallback() {
        lastRunAt = Date.now();
        timer = false;
        fn.apply(context, args);
      };
      if (timeDiff >= delay) {
        runCallback();
      } else {
        timer = setTimeout(runCallback, delay);
      }
    };
  },
  extend: function extend(defaults, options) {
    return Object.assign({}, defaults, options);
  },
  checkInView: function checkInView(el) {
    var rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0;
  }
};

/*
 * vue-lazyload
 */

var LazyLoad = {};
var win = window;

LazyLoad.install = function (Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  // 默认值
  var defaults = {
    defaultPic: '',
    errorPic: '', // 若没有此项，图片加载错误，则依然显示defaultPic的内容
    onSuccess: function onSuccess() {},
    onError: function onError() {},
    onComplete: function onComplete() {}
  };

  // 参数合并
  defaults = utils.extend(defaults, options);

  // 图片队列
  var listenerQueue = [];

  // 检查图片是否在可视区域内
  var checkInView = utils.checkInView;

  // 图片加载状态
  var STATUS = {
    loading: 'loading',
    loaded: 'loaded',
    error: 'error'
  };

  // 图片加载
  // 图片加载过程中给图片相应的状态
  // 前端可以根据状态自定义样式
  // 三个状态：loading、loaded、error
  // img[lazy="loaded"] {}
  var load = function load(listerer) {
    var el = listerer.el,
        loaded = listerer.loaded,
        sourceSrc = listerer.sourceSrc;

    var img = new win.Image();
    setImageStatus(el, STATUS.loading);
    img.src = sourceSrc;
    img.onload = function () {
      el.src = sourceSrc;
      setImageStatus(el, STATUS.loaded);
      listerer.loaded = true;
      defaults.onSuccess.call(null, el, listerer);
    };
    img.onerror = function () {
      setImageStatus(el, STATUS.error);
      listerer.loaded = false;
      defaults.onError.call(null, el, listerer);
    };
  };

  var setImageStatus = function setImageStatus(el, status) {
    el.setAttribute('lazy', status);
  };

  var lazyLoadHandler = utils.throttle(function (e) {
    var canIn = false;
    listenerQueue.forEach(function (listerer) {
      if (listerer.loaded) return;
      canIn = checkInView(listerer.el);
      canIn && load(listerer);
    });
  }, 200);

  var initEvent = function () {
    win.addEventListener('scroll', lazyLoadHandler);
  }();

  Vue.directive('lazy', function (el, binding) {

    var defaultSrc = defaults.defaultPic;
    var sourceSrc = binding.value;
    el.src = defaultSrc;
    listenerQueue.push({
      loaded: false,
      el: el,
      sourceSrc: sourceSrc,
      defaultSrc: defaultSrc
    });

    // DOM更新后立即执行
    Vue.nextTick(function () {
      lazyLoadHandler();
    });
  });
};

return LazyLoad;

})));
