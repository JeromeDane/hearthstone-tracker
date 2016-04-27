var express = require('express'),
    open = require('open');

var init = function() {

  var port = 3000,
      webpackPort = port + 1;
      app = express(),
      webpackUrl = 'http://localhost:' + webpackPort + '/';

  console.log("Starting server...");

  app.listen(port, function () {
    // console.log('Example app listening on port', port);
  });

  var webpack = require('webpack'),
      WebpackDevServer = require('webpack-dev-server'),
      config = require('../client/webpack.config');

      new WebpackDevServer(webpack(config), {
        hot: true,
        historyApiFallback: true,
        proxy: {
          "*": "http://localhost:" + port
        }
      }).listen(3001, 'localhost', function (err, result) {
        if(err) {
          console.log(err);
        }
        console.log('Server running on', webpackUrl);
      })

  open(webpackUrl);

}

module.exports = {
  init: init
};
