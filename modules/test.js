/**
* Test module, just add simple route
*/
exports.routes = function(app) {
  app.get('/test', function(req, res) {
    res.writeHead(200);
    res.end('Modular works!');
  });
}

/**
* Module's weight 
*/
exports.weight = 0;
