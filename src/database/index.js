var sqlite3 = require('sqlite3').verbose(),
    gamesTable = require('./tables/games'),
    fs = require('fs')

var dbFolder = './data'

// create folder for database files
if(!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder)
}
// nesting databse
var db = new sqlite3.Database(dbFolder + '/stats.db')

module.exports = {
  init: function() {
    // db.run("DROP TABLE games")
    // db.run("DROP TABLE card_use")

    // db.all("SELECT * from games", function(err, games) {
    //   console.log(games)
    // })
    // db.all("SELECT * from card_use", function(err, games) {
    //   console.log(games)
    // })

    gamesTable.init()
  },
  saveGame: gamesTable.saveGame
}
