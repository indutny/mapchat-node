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
    function __out(mime, str) {
      res.writeHead(200, {
        'Content-Type': mime,
        'Content-Length': Buffer.byteLength(str)
      });
      res.end(str);
    }
    
    res.json = function(obj, converted) {
      __out('application/json', converted ? (obj || '').toString() :
                                            JSON.stringify(obj) || '');
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
