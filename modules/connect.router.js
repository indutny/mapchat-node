/**
* Connect.js : Request router
*
* Adds .routes(app) callback
* that should be a valid function for connect.router
* function(app) {
* ...
* }
*/
exports.middleware = function(connect) {
  return connect.router(function(app) {
    invoke('routes', app);
  });
}

/**
* Module's weight 
*/
exports.weight = 0;
