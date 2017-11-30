Board = require("./board");
Move = require("./move");

class Game {
    constructor(args) {
        this.board = new Board();
        this.moves = [];
    }

    handleMove(from, to) {
        var move = new Move(from, to, Object.clone(this.board), this.moves.length + 1)
        this.board.handleMove(move);
        this.moves.push(move);
    }

    undoMove() {
        if (this.moves.length == 0) {
            return;
        }
        var move = this.moves[this.moves.length - 1];
        this.board = move.initialBoard;
        this.moves = this.moves.slice(0, this.moves.length - 1);
    }

    toJSON() {
        return JSON.stringify({
            "moves": this.moves.map(m => m.toJSON()),
            "board": this.board.toJSON()
        });
    }
}

module.exports = Game;
