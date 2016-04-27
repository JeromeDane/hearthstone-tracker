var sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('./data/stats.db')

module.exports = db
