var db = require('../connection'),
    ifTableDoesNotExist = require('../utils').ifTableDoesNotExist;

var createTable = function() {
  return new Promise(function(accept, reject) {
    console.log('Creating card_use database table');
    db.run("CREATE TABLE card_use (\
      game_id        INT,\
      playerName     CHAR(25),\
      cardId         CHAR(10),\
      cardName       CHAR(50),\
      action         CHAR(10),\
      turn           INT\
      )", accept);
  });
};

var saveCard = function(gameDbId, playerName, cardId, cardName, action, turn) {
  db.run("INSERT INTO card_use VALUES (?, ?, ?, ?, ?, ?)",
    gameDbId,
    playerName,
    cardId,
    cardName,
    action,
    turn
  );
}

var save = function(game, gameDbId) {
  ['player', 'opponent'].forEach(function(player) {
    ['played', 'discarded', 'drew', 'created'].forEach(function(action, i) {
      // only parse played and discarded for onnonent
      if(player !== 'opponent' || i < 2) {
        for(var cardId in game[player][action]) {
          var card = game[player][action][cardId];
          card.turns.forEach(function(turn) {
            saveCard(gameDbId, game[player].name, cardId, card.name, action, turn);
          });
        }
      }
    })
  })
};

module.exports = {
  init: function() {
    ifTableDoesNotExist('card_use').then(createTable);
  },
  save: save
};
