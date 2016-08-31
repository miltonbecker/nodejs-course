var http = require('http');

var server = http.createServer();
server.listen(8080);

server.on('request', function(request, response) {
  response.writeHead(200);
  response.write('Server here, got your message! Here it is: ');
  request.pipe(response, {end: false});
  request.on('end', function() {
    response.end('And that was it!');
  });
});

console.log('Listening...');
