// This file will create database connection
// And call "fn" when connection is ready
module.exports = function(fn) {
  var mongoose = require('../lib/mongoose/mongoose').Mongoose,
      db = mongoose.connect('mongodb://localhost/mapchat');
      
  db.mongoose = mongoose;
  db.models = {};
  db.on('open', function() {
    fn(db)
  });
};
