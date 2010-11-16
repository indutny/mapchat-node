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
  
  var server = connect.createServer.apply(connect, middleware);
  server.listen(8080, function() {
    invoke('onServerListening', server);
  });
}

/**
* Module's weight 
*/
exports.weight = -1E6;
