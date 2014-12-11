// var socket = io();
// $(document).ready(function() {
//     $('form').submit(function() {
//         socket.emit('chat_message', $('.chatInput').val());
//         $('.chatInput').val('');
//         return false;
//     });
// });
// socket.on('chat_message', function(msg) {
//     var div = $('.chatMsgWindow');
//     div.stop();
//     div.animate({
//         scrollTop: div[0].scrollHeight
//     }, 1000);
//     div.find('ul').append($('<li>').text(msg));
// });
