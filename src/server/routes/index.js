var createGamesRoutes = require('./games'),
    createCardUseRoutes = require('./card-use')

module.exports = function(app) {
  createGamesRoutes(app)
  createCardUseRoutes(app)
}
