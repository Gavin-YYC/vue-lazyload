
export default {

  throttle ( fn, delay ) {
    let timer = null;
    let lastRunAt = 0;
    return function () {
      if ( timer ) {
        return;
      }
      let timeDiff = Date.now() - lastRunAt;
      let context = this;
      let args = arguments;
      let runCallback = function () {
        lastRunAt = Date.now();
        timer = false;
        fn.apply( context, args );
      }
      if ( timeDiff >= delay ) {
        runCallback();
      } else {
        timer = setTimeout( runCallback, delay );
      }
    }
  },

  extend( defaults, options ) {
    return Object.assign( {}, defaults, options );
  },

  checkInView ( el ) {
    const rect = el.getBoundingClientRect();
    return ( rect.top < window.innerHeight && rect.bottom > 0 ) &&
           ( rect.left < window.innerWidth && rect.right > 0 );
  }

};
