module.exports = function(io) {
    var userSocketId;

    io.on('connection', function(socket) {
        console.log('user connected - ' + socket.id);
        userSocketId = socket.id;
        socket.on('disconnect', function() {
            console.log('user disconnected - ' + socket.id);
        });
        socket.on('chat_message', function(msg) {
            console.log('message: ' + msg.data);
            if (msg.data.trim() !== '')
                io.emit('chat_message', msg.data + ' recieved from ' + socket.id);
        });
        socket.on('request:chat_history', function(data, callback) {
            console.log(data.socketId);
            if (data.socketId === 'test1')
                callback({
                    messages: ['abc', 'bcd']
                });
            else
                callback({
                    messages: ['tuv', 'lala']
                });
        });
    });
};
