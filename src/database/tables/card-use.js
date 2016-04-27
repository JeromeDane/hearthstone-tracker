/* globals Promise */

var db = require('../connection'),
    ifTableDoesNotExist = require('../utils').ifTableDoesNotExist

var createTable = function() {
  return new Promise(function(accept, reject) {
    console.log('Creating card_use database table')
    db.run([
      'CREATE TABLE card_use (',
      'game_id        INT,',
      'playerName     CHAR(25),',
      'cardId         CHAR(10),',
      'cardName       CHAR(50),',
      'action         CHAR(10),',
      'turn           INT',
      ')'
    ].join(' '), accept)
  })
}

var saveCard = function(gameDbId, playerName, cardId, cardName, action, turn) {
  db.run('INSERT INTO card_use VALUES (?, ?, ?, ?, ?, ?)',
    gameDbId,
    playerName,
    cardId,
    action,
    turn
  )
}

var save = function(game, gameDbId) {
  ['player', 'opponent'].forEach(function(player) {
    ['played', 'discarded', 'drew', 'created'].forEach(function(action, i) {
      // only parse played and discarded for onnonent
      if(player !== 'opponent' || i < 2) {
        for(var cardId in game[player][action]) {
          game[player][action][cardId].turns.forEach(function(turn) {
            saveCard(gameDbId, game[player].name, cardId, action, turn)
          })
        }
      }
    })
  })
}

var getForGame = function(gameId, callback) {
  db.all('SELECT * FROM card_use WHERE game_id = ' + parseInt(gameId),
    function(err, rows) { callback(rows) }
  )
}

var getAllGame = function(callback) {
  db.all('SELECT * FROM card_use',
    function(err, rows) { callback(rows) }
  )
}

module.exports = {
  init: function() {
    ifTableDoesNotExist('card_use').then(createTable)
  },
  save: save,
  getForGame: getForGame
}
