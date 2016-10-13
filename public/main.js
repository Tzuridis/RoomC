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


$('.upload').on('change', function(e){
    //Get the first (and only one) file element
    //that is included in the original event
    var file = e.originalEvent.target.files[0],
        reader = new FileReader();
    //When the file has been read...
    reader.onload = function(evt){
        //Because of how the file was read,
        //evt.target.result contains the image in base64 format
        //Nothing special, just creates an img element
        //and appends it to the DOM so my UI shows
        //that I posted an image.
        //send the image via Socket.io
        socket.emit('user image', evt.target.result);
    };
    //And now, read the image and base64
    reader.readAsDataURL(file);  
});


socket.on('user image', image);

function image (from, base64Image) {
    $('#messages').append($('<p>').append($('<b>').text(from),
        '<img src="' + base64Image + '"/>'));
}


//end

});
