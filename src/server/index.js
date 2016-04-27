var express = require('express'),
    open = require('open'),
    path = require('path'),
    proxy = require('proxy-middleware'),
    createRoutes = require('./routes'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    CompilerPlugin = require('compiler-webpack-plugin'),
    config = require('../client/webpack.config'),
    ports = require('./ports'),
    browserOpened = false

var init = function() {

  var app = express(),
      webpackUrl = 'http://localhost:' + ports.webpack + '/'

  console.log('Compiling code...')

  // add dev server related webpack plugins
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.plugins.push(new CompilerPlugin('done', function(stats) {
    if(!browserOpened) {
      browserOpened = true
      console.log('Server running on', webpackUrl)
      open(webpackUrl)
    }
  }))
  config.devtool = 'source-map'

  new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,

    // send failed requests to express server
    proxy: {
      '*': 'http://localhost:' + ports.express
    }
  }).listen(3001, 'localhost', function(err, result) {
    if(err) {
      console.log(err)
    }
  })

  // add back-end routes to express server
  createRoutes(app)

  // return unmatched routes back to bebpack for historyApiFallback
  app.use('/*', proxy(webpackUrl))
  app.listen(ports.express)

  // open(webpackUrl)
}

module.exports = {
  init: init
}
