Board = require("./board");
Move = require("./move");

class App {
    constructor(args) {
        this.port = args.port || 9378;
        this.host = args.host || "127.0.0.1";
        this.board = new Board();
    }

    start() {
        var WebSocketServer = require('ws').Server;
        var wss = new WebSocketServer({ port: this.port });
        var $this = this;
        wss.on('connection', function connection(ws) {
            ws.on('message', function incoming(message) {
                console.log('received: %s', message);
                $this._handleMessage(message);
                console.log($this.board.toJSON());
                ws.send($this.board.toJSON());
            });
        });
    }

    _handleMessage(message) {
        if (message != "GetBoard") {
            var move = this._messageToMove(JSON.parse(message));
            this.board.handleMove(move);
        }
    }

    _messageToMove(message) {
        var move = new Move(
            new Position(message.from.x, message.from.y),
            new Position(message.to.x, message.to.y)
        );
        console.log("THE MOVE:");
        console.log(move);
        return move;
    }

}

module.exports = App;
