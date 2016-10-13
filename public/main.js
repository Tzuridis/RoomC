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
});