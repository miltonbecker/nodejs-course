var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('redis');
var redisClient = redis.createClient();

var storeMessage = function(name, data) {
  var message = JSON.stringify({name: name, data: data});
  redisClient.lpush('messages', message, function(err, response) {
    redisClient.ltrim('messages', 0, 9);
  });
}

io.on('connection', function(client) {
  console.log('Client connected.');

  client.on('join', function(name) {
    client.nickname = name;

    client.emit('add chatter', name);
    client.broadcast.emit('add chatter', name);

    redisClient.smembers('chatters', function(err, chatters) {
      chatters.forEach(function(chatter) {
        client.emit('add chatter', chatter);
      });
    });

    redisClient.sadd('chatters', name);

    redisClient.lrange('messages', 0, -1, function(err, messages) {
      messages = messages.reverse();
      messages.forEach(function(message) {
        message = JSON.parse(message);
        client.emit('messages', message.name + ': ' + message.data);
      });
    });
  });

  client.on('messages', function(data) {
    var nickname = client.nickname;
    client.emit('messages', nickname + ': ' + data);
    client.broadcast.emit('messages', nickname + ': ' + data);
    storeMessage(nickname, data);
  });

  client.on('disconnect', function(smth) {
    var name = client.nickname;
    client.broadcast.emit('remove chatter', name);
    redisClient.srem('chatters', name);
  });
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(8080);

console.log('Listening...');
