var fs = require('fs');
var http = require('http');

var server = http.createServer();

server.on('request', function(request, response) {
  var newFile = fs.createWriteStream('file-uploaded.md');
  request.pipe(newFile);

  request.on('end', function() {
    response.end('Uploaded!');
  });
});

server.listen(8080);

console.log('Listening...');
