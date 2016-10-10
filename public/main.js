$(document).ready(function () {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var username;

    var checkLocal = function () {
            var username;
        if (localStorage.getItem(username) !== undefined) {
           username = prompt('Please choose a username.');
            localStorage.setItem('username', username);
        }
        console.log('inside',username);
        return username;
    };

    checkLocal();

    console.log('outside',username);

    var addMessage = function (message) {
        if (username === undefined) {
            username = localStorage.getItem("username");
            username = JSON.parse(username);
        }
        if (typeof message === 'object') {
            $('#messages').append('<div>' + "(" + new Date().toLocaleString() + ") " + username.username + ":" + " " + message.message + " " + '</div>');
        } else {
            $('#messages').append('<div>' + "(" + new Date().toLocaleString() + ") " + username.username + ":" + " " + message + " " + '</div>');
        }

    };

    //Enter & show message

    $('#chat').on('keydown', function (event) {
        if (event.keyCode != 13) {
            return;
        };
        var message = input.val();
        addMessage(message);
        socket.emit('message', { username: username, message: message });
        input.val('');
        console.log(username, message);
    });

    // Defining sent

    socket.on('message', addMessage);
});