// Globals: db, modules
exports.model = {};

exports.init = function() {
};

exports.routes = function(app) {
  app.get('/message/:id', function(req, res) {
    res.writeHead(200);
    res.end(req.params.id);
  });
};
