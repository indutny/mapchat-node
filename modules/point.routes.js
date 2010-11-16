/**
* Routes for a point model
* Using CRUD
*/
exports.routes = function(app) {
  var Point = db.models.Point;
  
  // Create
  app.put('/point', function(req, res, next) {
    var point = new Point();
    
    // Get field from POST data
    // Insert them into point
    // And save
    point.save();
    res.json({ok: 1});
  });
  
  // Read
  app.get('/point/:id', function(req, res, next) {
    var point = Point.find({_id: req.params.id}).first(function(point) {      
      if (!point) return next();      
      res.json(point.toJSON(), true);
    });
  });
  
  // Update
  app.post('/point/:id', function(req, res, next) {
    var point = Point.find({_id: req.params.id}).first(function(point) {      
      if (!point) return next();
      // Get point from POST data
      // Change field values in 'point'
      // And save it
      point.save();
    });
    res.json({ok: 1});
  });
  
  // Delete  
  // Actually there won't be a delete function
};
