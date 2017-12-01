Game = require("./game");
Move = require("./move");
require("object-clone");

class Server {
    constructor(args) {
        this.port = args.port || 9378;
        this.host = args.host || "127.0.0.1";
        this.games = {};
        this.nextGameId = 1;
    }

    start() {
        var WebSocketServer = require('ws').Server;
        var wss = new WebSocketServer({ port: this.port });
        var $this = this;
        wss.on('connection', function connection(ws) {
            ws.on('message', function incoming(message) {
                console.log('received: %s', message);
                var resp = $this._handleMessage(JSON.parse(message));
                ws.send(resp);
            });
        });
    }

    _handleMessage(message) {
        switch(message.call) {
            case "NewGame":
                var game = new Game(this.nextGameId);
                this.games[this.nextGameId] = game;
                this.nextGameId++;
                return game.toJSON();
            case "GetBoard":
                console.log(this.games);
                var game = this.games[message.args.game_id]
                return game.toJSON();
            case "DoMove":
                var game = this.games[message.args.game_id]
                game.handleMove(
                    new Position(message.args.from.x, message.args.from.y),
                    new Position(message.args.to.x, message.args.to.y)
                );
                return game.toJSON();
            case "UndoMove":
                var game = this.games[message.args.game_id]
                game.undoMove();
                return game.toJSON();
            case "GetGamesIds":
                return this.games.map(g => g.id);
        }

    }
}

module.exports = Server;
