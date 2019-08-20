Board = require("./board");
Move = require("./move");
GameVariation = require("./game_variation");

class Game {
  constructor(id) {
    if (Math.random() > 0.5) {
      this._board = new Board(GameVariation.standardChess());
    } else {
      this._board = new Board(GameVariation.miniChess());
    }

    this._moves = [];
    this._id = id;
  }

  get moves() { return this._moves }
  get board() { return this._board }
  get id() { return this._id }

  set moves(m) { this._moves = m }
  set board(b) { this._board = b }

  handleMove(from, to) {
    var move = new Move(from, to, Object.clone(this.board), this.moves.length + 1);
    this.board.handleMove(move);
    this.moves.push(move);
  }

  promoteSquare(square, newPiece) {
    var move = new Move(square, square, Object.clone(this.board), this.moves.length + 1);
    this.board.promoteSquare(square, newPiece);
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
      "board": this.board.toJSON(),
      "height": this.board.height,
      "width": this.board.height,
      "gameId": this.id,
      "lastMove": this.moves[this.moves.length-1]
    });
  }
}

module.exports = Game;
