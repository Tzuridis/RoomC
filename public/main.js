$(document).ready(function () {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var username = prompt('Please enter a username');

    var addMessage = function (message) {
        var d = new Date(new Date().getTime()).toLocaleTimeString();
        if (typeof message === 'object') {
            $('#messages').append('<div>' + "(" + d + ") " + message.username + ":" + " " + message.message + " " + '</div>');
        } else {
            $('#messages').append('<div>' + "(" + d + ") " + username + ":" + " " + message + " " + '</div>');
        }

    };

    //Enter & show message

    $('#chat').on('keydown', function (event) {
        if (event.keyCode != 13) {
            return;
        }
        var message = input.val();
        addMessage(message);
        socket.emit('message', { username: username, message: message });
        input.val('');
        console.log(username, message);
    });

    // Defining sent

    socket.on('message', addMessage);

     var siofu = new SocketIOFileUpload(socket);
    var uploader = new SocketIOFileUpload(socket);
    uploader.listenOnInput(document.getElementById("siofu_input"));

    // Configure the three ways that SocketIOFileUpload can read files:
    document.getElementById("upload_btn").addEventListener("click", siofu.prompt, false);
    siofu.listenOnInput(document.getElementById("upload_input"));
    siofu.listenOnDrop(document.getElementById("file_drop"));

    // Do something on upload progress:
    siofu.addEventListener("progress", function(event){
        var percent = event.bytesLoaded / event.file.size * 100;
        console.log("File is", percent.toFixed(2), "percent loaded");
    });

    // Do something when a file is uploaded:
    siofu.addEventListener("complete", function(event){
        console.log(event.success);
        console.log(event.file);
    });

}, false);
