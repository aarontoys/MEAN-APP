var mongoose = require('mongoose');


//drop db
function dropDB (done) {
  mongoose.connection.db.dropDatabase();
  if (done) {
    done();
  }
}

module.exports = {
  dropDB: dropDB
}