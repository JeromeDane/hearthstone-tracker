var HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path')

module.exports = {
  entry: [
    path.resolve(__dirname, './index.js')
  ],
  output: {
    path: path.resolve(__dirname, '../dist/js'),
    publicPath: '/',
    filename: 'index.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: path.resolve(__dirname, '../../node_modules/'),
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hearthstone Tracker'
    })
  ]
}
