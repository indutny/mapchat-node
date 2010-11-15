var fs = require('fs'),
    path = require('path'),
    sys = require('sys'),
    helpers = require('./helpers');


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
      weighted = [],
      args = Array.prototype.slice.call(arguments, 1);
      
  addInvokeMethods(context, weighted);
  
  // Replace kind of wildcard '?' with objects itself,
  // So objects can be passed to context on demand
  for (var i in context) if (context[i] === '?') context[i] = objects;
  
  files.reduce(helpers.reduce(dir), []).forEach(function(file) {
    var result = helpers.require(file.filepath, context);
    
    // If module is disabled - do not load it
    if (result.enabled === false) return;
    
    // Add to modules object
    var object = objects[file.name] = result;
    
    // Add to weighted collection
    weighted.push({
      weight: parseInt(object.weight) || 0,
      name: file.name,
      value: object
    });
  });
  
  // Sort objects in collection by weight
  weighted.sort(function(a, b) {
    return a.weight > b.weight;
  });
  
  // All objects are in place
  // Invoke init
  context.invoke('init');
  
  // Return objects
  return objects;
}

/**
* Adds invoke methods to execution context
*
* Provides cool syntax
* invoke('init', arg1, arg2, arg3).array
*/
function addInvokeMethods(context, weighted) {
  var len;
  
  context.invoke = function(callbackName) {    
    var args = Array.prototype.slice.call(arguments, 1);
    
    // Calculate length only once
    len = len || weighted.length;
    
    var array = [], object = {};
    
    for (var i = 0; i < len; i++) {
      var elem = weighted[i],
          callback = elem.value[callbackName];
    
      if (!elem.value.hasOwnProperty(callbackName) ||
          !helpers.isFunction(callback)) continue;
      
      try {
        var result = callback.apply(elem, args);        
        array.push(result);
        object[elem.name] = result;
      } catch (e) {
        sys.puts(e);
      }
    }
    
    return {
      object: object,
      array: array
    };
  }
}
