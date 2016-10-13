var express = require('express');

var app = express();

var socket_io = require('socket.io');
var http = require('http');

var server = http.Server(app);
var io = socket_io(server);

var usercount = 0;

app.get('/', function (req, res) {
    res.sendfile('public/index.html');
});

var socket = io.of('/');

io.on('connection', function (socket) {
    usercount++;
    console.log('Client connected - Users connected', usercount);

    socket.on('message', function (message) {
        console.log('Received message:', message);
        //
        socket.broadcast.emit('message', message);
        //
    });

    socket.on('user image', function (msg) {
        //Received an image: broadcast to all
        io.emit('user image', socket.nickname, msg);
    });


    socket.on('disconnect', function (message) {
        usercount--;
        console.log('Client disconnected - Users connected', usercount);
        io.emit('users_count', 'Users Connected:' + usercount);
    });

});

app.use(express.static('public'));
server.listen(process.env.PORT || 8080);