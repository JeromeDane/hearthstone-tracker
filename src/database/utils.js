var db = require('./connection');

var ifTableExists = function(tableName) {
  return new Promise(function(accept, reject) {
    db.serialize(function() {
      db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='" + tableName + "';", function(err, row) {
        if(row) accept();
        else reject();
      });
    });
  });
};

var ifTableDoesNotExist = function(tableName) {
  return new Promise(function(accept, reject) {
    ifTableExists(tableName).then(reject, accept);
  });
}

module.exports = {
  ifTableExists: ifTableExists,
  ifTableDoesNotExist: ifTableDoesNotExist
};
