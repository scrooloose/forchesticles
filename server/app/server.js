Game = require("./game");
Move = require("./move");
require("object-clone");

class Server {
    constructor(args) {
        this.port = args.port || 9378;
        this.host = args.host || "127.0.0.1";
        this.game = new Game();
    }

    start() {
        var WebSocketServer = require('ws').Server;
        var wss = new WebSocketServer({ port: this.port });
        var $this = this;
        wss.on('connection', function connection(ws) {
            ws.on('message', function incoming(message) {
                console.log('received: %s', message);
                $this._handleMessage(JSON.parse(message));
                ws.send($this.game.toJSON());
            });
        });
    }

    _handleMessage(message) {
        switch(message.call) {
            case "GetBoard":
                return;
            case "DoMove":
                this.game.handleMove(
                    new Position(message.args.from.x, message.args.from.y),
                    new Position(message.args.to.x, message.args.to.y)
                );
                break;
            case "UndoMove":
                this.game.undoMove();
                break;
        }
    }
}

module.exports = Server;
