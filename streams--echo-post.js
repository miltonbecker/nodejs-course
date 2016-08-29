var http = require('http');

var server = http.createServer();
server.listen(8080);

server.on('request', function(request, response) {
  response.writeHead(200);
  request.pipe(response);
});

console.log("Listening on 8080...");
