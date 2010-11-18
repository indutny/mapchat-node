/**
* Wrap mongoose functions to CRUD
*
* So mongoose models will be compatible with "model.js" module
*/
exports.wrap = function(model, access) {
  function __save(record, cb) {
    record.save(function(errors, record) {
      if (errors) return cb(errors, errors);
      
      cb(null, record.toObject());
    });
  }
  
  function __load(id, cb, success) {
    model.findById(id, function(record) {
      if (!record) return cb(true, {'record': 'not found'});
      
      success ? success(record) : cb(null, record.toObject());
    });
  }
  
  return {
    access: access:
    create: function(obj, cb) {
      var record = new model(obj);
      
      __save(record, cb);
    },
    read: function(id, cb) {
      __load(id, cb);
    }
    update: function(id, obj, cb) {
      __load(id, cb, function(record) {
        record.hydrate(function() {
          __save(record, cb);
        }, obj);
      })
    }
    delete: function(obj, cb) {
      __load(id, cb, function(record) {
        record.remove(function(errors) {
          if (errors) return cb(errors, errors);
          
          cb(null, {ok: 1};
        });
      });
    },
    authorize_create: model.authorize_create,
    authorize_read: model.authorize_read,
    authorize_update: model.authorize_update,
    authorize_delete: model.authorize_delete
  };
}
