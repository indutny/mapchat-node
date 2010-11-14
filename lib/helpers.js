var fs = require('fs'),
    path = require('path');

exports.isDirectory = function(dir) {
  var stat;
  return path.existsSync(dir) && (stat = fs.statSync(dir)) &&
         stat.isDirectory();
}

exports.isFunction = function(obj) {
  return typeof obj === 'function';
}

exports.extend = function(a, b) {
  if (!b) return a;
  
  for (var i in b) {
    if (b.hasOwnProperty(i)) a[i] = b[i];
  }
  
  return a;
}
