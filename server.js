var express = require('express');
var SocketIOFileUpload = require('socketio-file-upload');

var app = express().use(SocketIOFileUpload.router);

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
     
    var uploader = new SocketIOFileUpload();
    uploader.dir = "/srv/uploads";
    uploader.listen(socket);

    // Do something when a file is saved:
    uploader.on("saved", function(event){
        console.log(event.file);
    });

    // Error handler:
    uploader.on("error", function(event){
        console.log("Error from uploader", event);
    });


socket.on('message', function (message) {
    console.log('Received message:', message);
    //
    socket.broadcast.emit('message', message);
    //
});

socket.on('disconnect', function (message) {
    usercount--;
    console.log('Client disconnected - Users connected', usercount);
    io.emit('users_count', 'Users Connected:' + usercount);
});

});

app.use(express.static('public'));
server.listen(process.env.PORT || 8080);