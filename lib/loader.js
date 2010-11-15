var fs = require('fs'),
    path = require('path'),
    Script = process.binding('evals').Script,
    helpers = require('./helpers');

/**
* This function will be used to process files array
*/
function reduce(dir) {
  return function(accum, elem) {
    var filepath = dir + elem;
    
    // Process only files
    if (!helpers.isDirectory(filepath)) {    
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
function _require(filepath, context) {
  var fn = Script.runInNewContext('(function(require, module, exports){\n' +
                                fs.readFileSync(filepath) +
                                '\n;})', context, filepath),
      exports = {},
      module = {exports: exports};
      
  fn(require, module, exports);
  
  return module.exports;
}

/**
* Loader - loads all js files from a directory root,
* compiles them and puts them into objects variable
*/
var loader = module.exports = function(dir, context) {
  if (!helpers.isDirectory(dir)) return;
  
  // Add trailing slash
  dir = dir.replace(/\/+$/, '') + '/';
  
  // Context must be defined
  context = context || {};
  
  var files = fs.readdirSync(dir),
      objects = {},
      args = Array.prototype.slice.call(arguments, 1);
  
  // Replace kind of wildcard '?' with objects itself,
  // So objects can be passed to context on demand
  for (var i in context) if (context[i] === '?') context[i] = objects;
  
  files.reduce(format(dir), []).forEach(function(file) {
    objects[file.name] = _require(file.filepath, context);
  });  
  
  return objects;
}
