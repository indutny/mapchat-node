module.exports = function(app) {
  // Get conversations list
  app.get('/api/v1/conversation', function(req, res) {
    
  });
  
  // Create new conversation
  app.put('/api/v1/conversation', function(req, res) {
  });
  
  // Get conversation
  app.get('/api/v1/conversation/:conversation', function(req, res) {
  });
  
  // Post message
  app.post('/api/v1/conversation/:conversation', function(req, res) {
  });
  
  // Get changes
  app.get('/api/v1/conversation/:conversation/_changes', function(req, res) {
  });
};
