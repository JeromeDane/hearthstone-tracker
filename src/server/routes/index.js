var createGamesRoutes = require('./games'),
    createCardUseRoutes = require('./card-use'),
    fs = require('fs'),
    path = require('path')

module.exports = function(app) {
  app.get('/assets/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../../', req.url))
  })
  createGamesRoutes(app)
  createCardUseRoutes(app)
}
