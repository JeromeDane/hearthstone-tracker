var cardUseTable = require('../../database/tables/card-use');

module.exports = function(app) {
  app.get('/card-use/*', function(req, res) {
    var parts = req.url.match(/card-use\/(\d+)/),
        gameId = parseInt(parts[1]);
    console.log("Gatting card use for game", gameId);
    cardUseTable.getForGame(gameId, function(rows) {
      console.log("Got card use", rows);
      res.json(rows);
    });
  });
}
