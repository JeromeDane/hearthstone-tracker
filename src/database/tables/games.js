var db = require('../connection'),
    cardUseTable = require('./card-use'),
    ifTableDoesNotExist = require('../utils').ifTableDoesNotExist;

var createTable = function() {
  return new Promise(function(accept, reject) {
    console.log('Creating games database table');
    db.run("CREATE TABLE games (\
     id             INTEGER PRIMARY KEY,\
     mode           CHAR(25),\
     playerName     CHAR(25),\
     playerClass    CHAR(25),\
     playerHeroId   CHAR(10),\
     opponentName   CHAR(25),\
     opponentClass  CHAR(25),\
     opponentHeroId CHAR(10),\
     result         CHAR(4),\
     conceeded      INTEGER,\
     turns          INT,\
     start          long,\
     end            long\
     )", accept);
  });
};

var saveGame = function(game) {
  db.run("INSERT INTO games (\
    mode, playerName, playerClass, playerHeroId, opponentName, opponentClass,\
    opponentHeroId, result, conceeded, turns, start, end)\
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    game.mode,
    game.player.name,
    game.player.class,
    game.player.heroId,
    game.opponent.name,
    game.opponent.class,
    game.opponent.heroId,
    game.player.result,
    game[game.player.result === 'WON' ? 'opponent' : 'player'].conceded ? 1 : 0,
    game.turn,
    game.start.getTime(),
    game.end.getTime(),
    function() {
      cardUseTable.save(game, this.lastID);
    }
  );
};

module.exports = {
  init: function() {
    ifTableDoesNotExist('games').then(createTable);
    cardUseTable.init();
  },
  saveGame: saveGame
};
