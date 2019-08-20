Piece = require('./piece');
Position = require('./position');
GameVariation = require('./game_variation');

class Board {
  constructor(gameVariation) {
    this._gameVariation = gameVariation;
    this.resetBoard();
  }

  get pieces() { return this._pieces }

  toJSON() {
    let height = this._gameVariation.height;
    let width = this._gameVariation.width;

    var rv = new Array(height)
      .fill(null)
      .map(x => new Array(width).fill(null));

    console.log(rv);

    this._pieces.forEach(function(piece){
      console.log(piece);
      rv[piece.position.y][piece.position.x] = piece;
    });

    return rv
  }

  handleMove(move) {
    var firstPiece = this.pieceFor(move.from);
    var secondPiece = this.pieceFor(move.to);

    firstPiece.position = move.to;

    if (secondPiece) {
      this._pieces.splice(this._pieces.indexOf(secondPiece), 1);
    }
  }

  promoteSquare(square, piece) {
    var existingPiece = this.pieceFor(square);

    if (existingPiece) {
      this.pieces.splice(this.pieces.indexOf(existingPiece), 1);
    }

    this.pieces.push(piece);
  }

  pieceFor(pos) {
    return this._pieces.find(function(piece) {
      return piece.position.isEqual(pos);
    });
  }

  resetBoard() {
    this._pieces = this._gameVariation.pieces
  }

  clone() {
  }
};

module.exports = Board;
