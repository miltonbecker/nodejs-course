var fs = require('fs');
var http = require('http');

var server = http.createServer();
server.listen(8080);

server.on('request', function(request, response) {
  //pick a fairly big image to see the progress
  var newFile = fs.createWriteStream('file-uploaded.jpg');
  var fileSize = request.headers['content-length'];
  var uploadedBytes = 0;

  request.on('readable', function() {
    var chunk = null;
    while (null !== (chunk = request.read())) {
      uploadedBytes += chunk.length;
      var progress = (uploadedBytes / fileSize) * 100;
      response.write("Progress: " + parseInt(progress, 10) + "%\n");
    }
  });

  request.pipe(newFile);

  request.on('end', function() {
    response.end('Uploaded!');
  });
});

console.log('Listening...');
