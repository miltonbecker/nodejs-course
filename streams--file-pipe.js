var fs = require('fs');

var file = fs.createReadStream('readme.md');
var newFile = fs.createWriteStream('readme-copy.md');

file.pipe(newFile);
