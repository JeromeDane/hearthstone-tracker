var LogReader = require('hearthstone-log-reader'),
    db = require('./database');

db.init();

var reader = new LogReader({
  // verbose: true
});

reader.on('player-detected', function(player) {
  // console.log('\n\n\nPLAYER DETECTED:===================\n', player);
});
reader.on('game-state', function(tag, value) {
  // console.log('\ngame-state:', tag, value);
});
reader.on('game-start', function(game) {
  console.log('Starting game:\n', game);
});
reader.on('turn-start', function(turn, player) {
  console.log('Starting turn', turn, '(' + player.name + ')');
})
reader.on('draw-card', function(player, cardId, cardName) {
  console.log(player.name, 'drew', cardName);
})
reader.on('mulligan-card', function(player, cardId, cardName) {
  console.log(player.name, 'mulliganed', cardName);
})
reader.on('play-card', function(player, cardId, cardName) {
  console.log(player.name, 'played', cardName);
})
reader.on('discard-card', function(player, cardId, cardName) {
  console.log(player.name, 'discarded', cardName);
})
reader.on('create-card', function(player, cardId, cardName) {
  console.log(player.name, 'created', cardName);
})
reader.on('zone-change', function(data) {
  // console.log(data.cardName, 'moved from', data.fromTeam, data.fromZone, 'to', data.toTeam, data.toZone);
})
reader.on('game-complete', function(game) {
  console.log('Game Complete:\n', game);
  console.log('\n\ndrew', game.player.drew);
  console.log('\n\nplayed', game.player.played);
  console.log('\n\ncreated', game.player.created);
  console.log('\n\ndiscarded', game.player.discarded);
  console.log('\n\nopplayed', game.opponent.played);
  console.log('\n\nopdiscarded', game.opponent.discarded);
  db.saveGame(game);
});

reader.start();
