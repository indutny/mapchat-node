/**
* Adds models to database and creates routes for them
*/

var routes = [];

/**
* Invokes all models for info on .init() callback
*/
exports.init = function() {
  var models = invoke('model').object;
  
  db.models = {};
  
  for (var name in models) {
    var lname = models.replace(/^.*\./, '').toLowerCase(),
        middleware = createRoutes(lname, db.models[lname] = models[name]);
     
    routes.push(middleware);
  }
};

/**
* Creates routes for a model,
* based on access field of model
*
* Model should have following fields:
* access = 'CRUD' (where each letter may be present or not)
*
* create = f()
* read = f()
* update = f()
* delete = f()
*
* authorize_create
* etc...
*
*/
function createRoutes(name, model) {
  var access = (model.access || '').toString(),
      C = access.indexOf('C') !== -1,
      R = access.indexOf('R') !== -1,
      U = access.indexOf('U') !== -1,
      D = access.indexOf('D') !== -1;
  
      
  return function(app) {
    // Authorize wrapper
    function __authorize(authorize_callback, success) {
      return authorize_callback ? function(req, res) {      
        authorize_callback(req, function(err) {
          if (err) return res.json(err, err);
          success(req, res);
        });        
      } : success;
    };
    
    // Create op - POST request
    C && app.post('/' + name, __authorize(model.authorize_create,
        function(req, res) {
          model.create(req.body, function(err, object) {
            res.json(object, err);
          });
        }));
    
    // Read op - GET request
    R && app.get('/' + name + '/:id', __authorize(model.authorize_read,
        function(req, res) {
          model.read(req.params.id, function(err, object) {
            res.json(object, err);
          });
        }));
    
    // Update op - PUT request
    U && app.put('/' + name + '/:id', __authorize(model.authorize_update,
        function(req, res) {
          model.update(req.params.id, req.body, function(err, object) {
            res.json(object, err);
          });
        }));
    
    // Delete op - DELETE request
    D && app.post('/' + name + '/:id', __authorize(model.authorize_delete,
        function(req, res) {
          model.delete(req.params.id, function(err, object) {
            res.json(object, err);
          });
        });
  }
}

/**
* Export routes callback
*/
exports.routes = function(app) {
  routes.forEach(function(route) {
    route(app);
  });
}
