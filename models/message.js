// Globals: db, models
var Message = module.exports = function() {
}

Message.init = function() {
};

Message.routes = function(app) {
  app.get('/message/:id', function(req, res) {
    res.writeHead(200);
    res.end(req.params.id);
  });
};
