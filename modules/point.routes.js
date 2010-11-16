/**
* Routes for a point model
*/
exports.routes = function(app) {
  var Point = db.models.Point;
  
  // Create
  app.put('/point', function(req, res, next) {
    var point = new Point();
  });
  
  // Read
  app.get('/point/:id', function(req, res, next) {
    var point = Point.find({_id: req.params.id}).first(function(point) {      
      if (!point) return next();      
      res.json(point.toJSON(), true);
    });
  });
  
  
};
