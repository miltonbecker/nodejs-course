var http = require('http');

var server = http.createServer();

server.on('request', function(request, response) {
  response.writeHead(200);
  request.pipe(response);
});

server.listen(8080);

console.log("Listening on 8080...");
