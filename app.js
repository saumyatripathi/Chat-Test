var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var logger = require('morgan');
var url = require('url');

var environment = require('./app/config.js').environment;
var config = require('./app/config.js')[environment];

app.use(logger('dev'));
app.use('/static', express.static(path.join(__dirname, config.static)));
app.use('/scripts', express.static(path.join(__dirname, config.scripts)));
app.use('/styles', express.static(path.join(__dirname, config.styles)));
app.use('/vendors', express.static(path.join(__dirname, config.vendors)));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, config.index));
});

var userSocketId;

app.get('/api/GetChatHistory', function(req, res) {
    if (url.parse(req.url, true).query.socketId === 'test1')
        res.send(['abc', 'bcd']);
    else
        res.send(['tuv', 'wxy']);
});

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
});

http.listen(config.port, function() {
    console.log('listening on: ' + config.port);
});
