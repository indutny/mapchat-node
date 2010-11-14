var connect = require('connect');

module.exports = function(routes) {
  var server = connect.createServer(
    connect.router(function(app) {
      routes.forEach(function(routes) {
        routes(app);
      });
    })
  );
  
  server.listen(8080);
}
