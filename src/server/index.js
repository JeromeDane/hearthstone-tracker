var express = require('express'),
    open = require('open'),
    createRoutes = require('./routes')

var init = function() {

  var port = 3000,
      webpackPort = port + 1,
      app = express(),
      webpackUrl = 'http://localhost:' + webpackPort + '/'

  console.log('Starting server...')

  createRoutes(app)
  app.listen(port)

  var webpack = require('webpack'),
      WebpackDevServer = require('webpack-dev-server'),
      config = require('../client/webpack.config')

  new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    proxy: {
      '*': 'http://localhost:' + port
    }
  }).listen(3001, 'localhost', function(err, result) {
    if(err) {
      console.log(err)
    }
    console.log('Server running on', webpackUrl)
  })

  open(webpackUrl)

}

module.exports = {
  init: init
}
