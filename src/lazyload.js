
/*
 * vue-lazyload
 * 只提供简单的功能
 * 1、设置默认显示图
 * 2、设置父容器
 */

import utils from './utils/utils.js';

const LazyLoad = {};

LazyLoad.install = ( Vue, options ) => {

  // 默认值
  let defaults = {
    defaultPic: ''
  }

  // 参数合并
  defaults = Object.assign( {}, defaults, options );

  // 图片队列
  const listenerQueue = [];

  // 检查图片是否在可视区域内
  var checkInView = el => {
    const rect = el.getBoundingClientRect();
    return ( rect.top < window.innerHeight && rect.bottom > 0 ) &&
           ( rect.left < window.innerWidth && rect.right > 0 );
  }

  // 图片加载
  // 图片加载过程中给图片相应的状态
  // 前端可以根据状态自定义样式
  // 三个状态：loading、loaded、error
  // img[lazy="loader"]
  var load = listerer => {
    const { el, loaded, sourceSrc } = listerer;
    const img = new Image();
    setImageStatus( el, 'loading' );
    img.src = sourceSrc;
    img.onload = () => {
      el.src = sourceSrc;
      setImageStatus( el, 'loaded' );
      listerer.loaded = true;
    }
    img.onerror = () => {
      setImageStatus( el, 'error' );
      listerer.loaded = false;
    }
  }

  var setImageStatus = ( el, status ) => {
    el.setAttribute('lazy', status);
  }

  var lazyLoadHandler = utils.throttle(( e ) => {
    let canIn = false;
    listenerQueue.forEach(listerer => {
      if ( listerer.loaded ) return;
      canIn = checkInView( listerer.el );
      canIn && load( listerer );
    });
  }, 200);

  Vue.directive('lazy', {

    bind ( el ) {
      const defaultSrc = defaults.defaultPic;
      const sourceSrc = el.getAttribute('src');
      el.src = defaultSrc;
      listenerQueue.push({
        loaded: false,
        el: el,
        sourceSrc: sourceSrc,
        defaultSrc: defaultSrc
      });

      // 事件监听
      window.addEventListener('scroll', lazyLoadHandler);
    }
  });
}

export default LazyLoad;
