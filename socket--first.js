var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var messages = [];

var storeMessage = function(name, data) {
  messages.push({name: name, data: data});
  if (messages.length > 10) {
    messages.shift();
  }
}

io.on('connection', function(client) {
  console.log('Client connected.');

  client.on('join', function(name) {
    client.nickname = name;
    messages.forEach(function(message) {
      client.emit('messages', message.name + ': ' + message.data);
    });
  });

  client.on('messages', function(data) {
    var nickname = client.nickname;
    client.emit('messages', nickname + ': ' + data);
    client.broadcast.emit('messages', nickname + ': ' + data);
    storeMessage(nickname, data);
  });
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(8080);

console.log('Listening...');
