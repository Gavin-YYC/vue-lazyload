
/*
 * vue-lazyload
 */

import utils from './utils/utils.js';

const LazyLoad = {};
const win = window;

LazyLoad.install = ( Vue, options = {} ) => {

  // 默认值
  let defaults = {
    defaultPic: '',
    errorPic: '', // 若没有此项，图片加载错误，则依然显示defaultPic的内容
    onSuccess: () => {},
    onError: () => {},
    onComplete: () => {}
  }

  // 参数合并
  defaults = utils.extend( defaults, options );

  // 图片队列
  const listenerQueue = [];

  // 检查图片是否在可视区域内
  const checkInView = utils.checkInView;

  // 图片加载状态
  const STATUS = {
    loading: 'loading',
    loaded: 'loaded',
    error: 'error'
  }

  // 图片加载
  // 图片加载过程中给图片相应的状态
  // 前端可以根据状态自定义样式
  // 三个状态：loading、loaded、error
  // img[lazy="loaded"] {}
  const load = listerer => {
    const { el, loaded, sourceSrc } = listerer;
    const img = new win.Image();
    setImageStatus( el, STATUS.loading );
    img.src = sourceSrc;
    img.onload = () => {
      el.src = sourceSrc;
      setImageStatus( el, STATUS.loaded );
      listerer.loaded = true;
      defaults.onSuccess.call( null, el, listerer );
    }
    img.onerror = () => {
      setImageStatus( el, STATUS.error );
      listerer.loaded = false;
      defaults.onError.call( null, el, listerer );
    }
  }

  const setImageStatus = ( el, status ) => {
    el.setAttribute('lazy', status);
  }


  const lazyLoadHandler = utils.throttle(( e ) => {
    let canIn = false;
    listenerQueue.forEach(listerer => {
      if ( listerer.loaded ) return;
      canIn = checkInView( listerer.el );
      canIn && load( listerer );
    });
  }, 200);


  const initEvent = (() => {
    win.addEventListener('scroll', lazyLoadHandler);
  })();

  Vue.directive('lazy', ( el, binding ) => {

    const defaultSrc = defaults.defaultPic;
    const sourceSrc = binding.value;
    el.src = defaultSrc;
    listenerQueue.push({
      loaded: false,
      el: el,
      sourceSrc: sourceSrc,
      defaultSrc: defaultSrc
    });

    // DOM更新后立即执行
    Vue.nextTick(() => {
      lazyLoadHandler();
    });
  });
}

export default LazyLoad;
