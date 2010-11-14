var connect = require('connect');

module.exports = function(routes, staticPath) {

  // Add redirect from / to /index.html
  routes.push(function(app) {
    app.get('/', function(req, res) {
      res.writeHead(301, {
        'Location': '/index.html'
      });
      res.end();
    });
  });
  
  
  var server = connect.createServer(
    connect.router(function(app) {
      routes.forEach(function(routes) {
        routes(app);
      });
    }),
    connect.staticProvider(staticPath)
  );
  
  server.listen(8080);
}
