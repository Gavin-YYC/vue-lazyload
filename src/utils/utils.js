
var utils = {

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



  on () {

  },

  off () {

  }
};


export default utils;
