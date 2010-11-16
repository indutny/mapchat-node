/**
* Attaches socket.io-node to connect server
*/

var io = require('socket.io');

/**
* When server has started listening
* Attach socket.io to it
*/
exports.onServerListening = function(server) {
  var socket = io.listen(server);
  
  // On client connection
  socket.on('connection', function(client) {
  
    // On client message
    client.on('message', function(message) {
    });
    
    // On client disconnect
    client.on('disconnect', function() {
    });
    
  });
}
