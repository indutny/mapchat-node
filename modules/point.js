/**
* Initiates point model
*/
var Buffer = require('buffer').Buffer;

db.mongoose.model({
  properties: ['location', 'topic', 'author_id', 'updated_at'],
  indexes: {
    'location': '2d',
    'updated_at': -1,
    'author_id': 1
  }
});

var Point = db.models.Point = db.model('Point');

exports.routes = function(app) {
  app.get('/point/:id', function(req, res, next) {
    var point = Point.find({_id: req.params.id}).first(function(point) {      
      if (!point) return next();      
      res.json(point.toJSON(), true);
    });
  });
};

var p = new Point();
p.save();

