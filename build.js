import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/lazyload.js',
  dest: 'build/lazyload.js',
  format: 'umd',
  moduleName: 'lazyload',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    uglify()
  ]
};
