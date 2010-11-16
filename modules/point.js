/**
* Initiates point model
*/

db.mongoose.model({
  properties: ['location', 'topic', 'author_id', 'updated_at'],
  indexes: {
    'location': '2d',
    'updated_at': -1,
    'author_id': 1
  }
});

var Point = db.models.Point = db.model('User');

exports.routes = function(app) {
  app.get('/point/:id', function(req, res) {
    var point = Point.find({_id: req.params.id}).first(function(point) {
      if (!point) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.writeHead(200);
      res.write(point.toJSON());
    });    
  });
};
