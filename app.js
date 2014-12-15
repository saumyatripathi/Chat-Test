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

require('./app/routes/socket.js')(io);

http.listen(config.port, function() {
    console.log('listening on: ' + config.port);
});
