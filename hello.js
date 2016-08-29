var http = require('http');

var server = http.createServer();
server.listen(8080);

server.on('request', function(request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });

  response.write("<p>Dog is running...</p>");
  setTimeout(function() {
    response.write("<p>Dog is done.</p>");
    response.end();
  }, 5000);
});

console.log("Listening on port 8080...");
