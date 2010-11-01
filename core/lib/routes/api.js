module.exports = function(db) {
  return function(app) {
    // Get conversations in bbox
    app.get('/api/v1/conversation', function(req, res) {      
      var status = db.findConversationsInBBox({
        // ... bbox will be here
      });
      
      // Check status and respond to client
    });
    
    // Watch conversations list
    app.get('/api/v1/conversation', function(req, res) {      
      var status = db.watchConversationsInBBox({
        // ... bbox will be here
      });
      
      // Check status and respond to client
    });
    
    // Create new conversation
    app.put('/api/v1/conversation', function(req, res) {
      var status = db.createConversation({
        // ... some data ...
      });
      
      // Check status and respond to client
    });
    
    // Get conversation
    app.get('/api/v1/conversation/:conversation', function(req, res) {
      var conversation = db.getConversation(req.params.conversation);
      
      // Check status and respond to client
    });
    
    // Post message
    app.post('/api/v1/conversation/:conversation', function(req, res) {
      var status = db.updateConversation(req.params.conversation, {
        // ... some data ...
      });
      
      // Check status and respond to client
    });
    
    // Get changes
    app.get('/api/v1/conversation/:conversation/_changes/:last_id?', function(req, res) {
      var emitter = db.watchConversation(req.params.conversation,
                                         req.params.last_id || 0);
      
      // Check status and respond to client
      
      emitter.on('change', function(data) {
        // Do something
      });
    });
  };
};
