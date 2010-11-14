var fs = require('fs'),
    path = require('path'),
    Script = process.binding('evals').Script,
    helpers = require('./helpers');
    
function format(elem) {
  return {
    name: path.basename(elem, '.js'),
    filepath: elem
  };
}

function _require(filepath, context) {
  var fn = Script.runInNewContext('(function(require, module, exports){\n' +
                                fs.readFileSync(filepath) +
                                '\n;})', context, filepath),
      exports = {},
      module = {exports: exports};
      
  fn(require, module, exports);
  
  return module.exports;
}

var loader = module.exports = function(dir, context) {
  if (!helpers.isDirectory(dir)) return;
  
  // Add trailing slash
  dir = dir.replace(/\/+$/, '') + '/';
  
  // Context must be defined
  context = context || {};
  
  var files = fs.readdirSync(dir),
      objects = {},
      args = Array.prototype.slice.call(arguments, 1);
  
  for (var i in context) if (context[i] === '?') context[i] = objects;
  
  files.map(format).forEach(function(file) {
    objects[file.name] = _require(dir + file.filepath, context);
  });
  
  for (var i in objects) {
    var current = objects[i];
    current.init && current.init();
  }
  
  return objects;
}

loader.invoke = function(objects, method, result, fn) {
  for (var i in objects) {
    var current = objects[i][method];
    
    fn(result, current);
  }
  
  return result;
}

loader.invokeForObject = function(objects, method) {
  return loader.invoke(objects, method, {}, function(result, current) {
    if (helpers.isFunction(current)) {
      current = current(result);
    }
    
    if (!current) return;
    
    helpers.extend(result, current);
  });
}

loader.invokeForArray = function(objects, method) {
  return loader.invoke(objects, method, [], function(result, current) {
    if (!current) return;
    
    result.push(current);
  });
}
