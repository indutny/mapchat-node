/**
* Adds middleware, that adds methods:
* # json
* # html
*/

var Buffer = require('buffer').Buffer;

/**
* Exports middleware
*/
exports.middleware = function(connect) {
  return function(req, res, next) {
    function __out(mime, str, code) {
      res.writeHead(code || 200, {
        'Content-Type': mime,
        'Content-Length': Buffer.byteLength(str)
      });
      res.end(str);
    }
    
    res.json = function(obj, error) {
      __out('application/json', JSON.stringify(obj), error && 403);
    }
    
    res.html = function(value) {
      __out('text/html', (value || '').toString());
    }
    
    next();
  }
}

/**
* Try to be first
*/
exports.weight = -1E9;
