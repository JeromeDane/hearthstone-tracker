var gamesTable = require('../../database/tables/games');

module.exports = function(app) {
  app.get('/games', function(req, res) {
    gamesTable.getAll(function(games) {
      res.json(games);
    });
  });
  app.get('/games/*', function(req, res) {
    var parts = req.url.match(/games\/(\d+)/),
        gameId = parseInt(parts[1]);
    gamesTable.getById(gameId, function(game) {
      res.json(game)
    });
  });
}
