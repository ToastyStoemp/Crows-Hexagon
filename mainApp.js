/*var http = require('http');

http.createServer(function (req, res) {
	
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');*/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	io.emit('chat message', 'A user connected');
	socket.on('disconnect', function(){
    console.log('user disconnected');
	io.emit('chat message', 'A user disconnected');
  	});
  	socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on port:3000');
});