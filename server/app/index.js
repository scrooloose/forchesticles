Board = require("./board")
new Board();

var PORT = 9378;
var HOST = "127.0.0.1";
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: PORT });
wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        ws.send(board.to_json);
    });
});

