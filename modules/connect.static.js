/**
* Connect.js : Static provider
*
* Servers static content
*/

/**
* Export static content middleware
*/
exports.middleware = function(connect) {
  return connect.staticProvider(__dirname + '/../public/');
}

exports.weight = 1E6;
