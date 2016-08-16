/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var http = require('http');
var messagesEndpoint = '/classes/messages';
var roomsEndpoint = '/classes/room';
var results = [];
var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = 200;
  var headers = request.headers;
  var method = request.method;
  var url = request.url;

  // See the note below about CORS headers.
  var allowedHeaders = defaultCorsHeaders;

  var responseBody = {
    headers: headers,
    method: method,
    url: url,
    results: results
  };

  if (request.url !== messagesEndpoint && request.url !== roomsEndpoint) {
    response.writeHead(404, defaultCorsHeaders);
    response.end();
  }

  if (request.method === 'POST' && (request.url === messagesEndpoint || request.url === roomsEndpoint)) {
    request.on('data', function(chunk) {
      var chunk = JSON.parse(chunk);
      results.push(chunk);
    }).on('end', function () {
      response.writeHead(201, defaultCorsHeaders);
      headers['Content-Type'] = 'application/json';
      response.end(JSON.stringify(responseBody));
    });
  }

  if (request.method === 'GET' && (request.url === messagesEndpoint || request.url === roomsEndpoint)) {
    response.writeHead(200, allowedHeaders);

    response.end(JSON.stringify(responseBody));
  }
};

module.exports = requestHandler;

