console.log('Tracking Hearthstone stats ...')

// https://www.npmjs.com/package/hearthstone-log-watcher
var LogWatcher = require('hearthstone-log-watcher');

var logWatcher = new LogWatcher({
  // verbose: true
});

logWatcher.on('zone-change', data => {
  // console.log(data.cardName + ' has moved from ' + data.fromTeam + ' ' + data.fromZone + ' to ' + data.toTeam + ' ' + data.toZone);
});

logWatcher.on('game-state', (tag, value) => {
 // console.log('game-state:', tag, value);
})

logWatcher.on('turn-start', (turn, player) => {
  // console.log('Starting turn', turn, '(player ' + player + ')');
})

logWatcher.on('play-card', (playerNum, cardId, cardName) => {
  console.log('Player', playerNum, 'played', cardName);
})
logWatcher.on('draw-card', (playerNum, cardId, cardName) => {
  console.log('Player', playerNum, 'drew', cardName);
})
logWatcher.on('discard-card', (playerNum, cardId, cardName) => {
  console.log('Player', playerNum, 'discarded', cardName);
})

logWatcher.on('game-mode', mode => {
  // console.log('Game mode is now', mode);
})

logWatcher.on('game-result', (result) => {
  // console.log('game-result:', result);
})

logWatcher.on('game-start', game => {
 console.log('game-start:', game);
});

logWatcher.on('game-complete', game => {
 console.log('game-complete:', game);
 console.log('played', game.player1.played)
 console.log('drew', game.player1.drew)
 console.log('discarded', game.player1.discarded)
});

logWatcher.start();
