var fs = require('fs'),
    path = require('path'),
    Script = process.binding('evals').Script;

/**
* Check, whether dir is directory or not
*/
var isDirectory = exports.isDirectory = function(dir) {
  var stat;
  return path.existsSync(dir) && (stat = fs.statSync(dir)) &&
         stat.isDirectory();
}

/**
* is obj function?
*/
exports.isFunction = function(obj) {
  return typeof obj === 'function';
}

/**
* Copy own properties of b to a
*/
exports.extend = function(a, b) {
  if (!b) return a;
  
  for (var i in b) {
    if (b.hasOwnProperty(i)) a[i] = b[i];
  }
  
  return a;
}

/**
* This function will be used to process files array
*/
exports.reduce = function(dir) {
  return function(accum, elem) {
    var filepath = dir + elem;
    
    // Process only files
    if (!isDirectory(filepath)) {    
      accum.push({
        name: path.basename(elem, '.js'),
        filepath: filepath
      });
    }
    
    return accum;
  }
}

/**
* Compile script in a new context
* Very common to nodejs module system
*/
exports.require = function(filepath, context) {
  var fn = Script.runInNewContext('(function(require, console, __dirname, ' +
                                  '__filename, module, exports){\n' +
                                  fs.readFileSync(filepath) +
                                  '\n;})', context, filepath),
      exports = {},
      module = {exports: exports},
      dirname = path.dirname(filepath);
  
  fn(require, console, dirname, filepath, module, exports);
  
  return module.exports;
}
