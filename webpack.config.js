module.exports = {
  entry: './demo/index.js',
  output: {
    path: './dist/js/',
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }]
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  }
}
