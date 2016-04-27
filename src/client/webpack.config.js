var HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3001',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, './index.js')
  ],
  output: {
    path: path.resolve(__dirname, '../dist/js'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: './node_modules/',
      loader: 'babel-loader'
    ]}
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hearthstone Tracker'
    }),
  ]
};
