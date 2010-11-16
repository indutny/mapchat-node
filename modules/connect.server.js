/**
* Connect.js: HTTP Server
*
* Adds .middleware(connect) callback that should return request function
* function(req, res, next) {
* ...
* }
*/

/**
* .init() callback
*/
exports.init = function() {    
  var connect = require('connect'),
      middleware = invoke('middleware', connect).array;
                   
  middleware.unshift(connect.errorHandler());
  
  connect.createServer.apply(connect, middleware).listen(8080);
}

/**
* Module's weight 
*/
exports.weight = -1E6;
