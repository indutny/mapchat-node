// This file will create database connection
// And call "fn" when connection is ready
module.exports = function(fn) {
  var db = {};
  fn && fn(db);
};
