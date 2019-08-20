Board = require("./board");
Piece = require("./piece");

class GameVariation {

  constructor({width, height, pieces}) {
    this._width = width;
    this._height = height;
    this._pieces = pieces;
  }

  get width() { return this._width }
  get height() { return this._height }
  get pieces() {
    return JSON.parse(JSON.stringify(this._pieces));
  }

  static standardChess() {
    var pieces = [
      //bottom left player
      Piece.pawn(new Position(0, 3), 1),
      Piece.pawn(new Position(1, 3), 1),
      Piece.pawn(new Position(2, 3), 1),
      Piece.pawn(new Position(3, 3), 1),
      Piece.pawn(new Position(3, 2), 1),
      Piece.pawn(new Position(3, 1), 1),
      Piece.pawn(new Position(3, 0), 1),
      Piece.king(new Position(0, 0), 1),
      Piece.rook(new Position(1, 0), 1),
      Piece.rook(new Position(0, 1), 1),
      Piece.knight(new Position(0, 2), 1),
      Piece.knight(new Position(2, 1), 1),
      Piece.bishop(new Position(2, 0), 1),
      Piece.bishop(new Position(1, 2), 1),
      Piece.queen(new Position(1, 1), 1),

      //bottom right player
      Piece.pawn(new Position(4, 3), 2),
      Piece.pawn(new Position(5, 3), 2),
      Piece.pawn(new Position(6, 3), 2),
      Piece.pawn(new Position(7, 3), 2),
      Piece.pawn(new Position(4, 2), 2),
      Piece.pawn(new Position(4, 1), 2),
      Piece.pawn(new Position(4, 0), 2),
      Piece.king(new Position(7, 0), 2),
      Piece.rook(new Position(6, 0), 2),
      Piece.rook(new Position(7, 1), 2),
      Piece.knight(new Position(5, 0), 2),
      Piece.knight(new Position(6, 2), 2),
      Piece.bishop(new Position(5, 1), 2),
      Piece.bishop(new Position(7, 2), 2),
      Piece.queen(new Position(6, 1), 2),

      //top left player
      Piece.pawn(new Position(0, 4), 3),
      Piece.pawn(new Position(1, 4), 3),
      Piece.pawn(new Position(2, 4), 3),
      Piece.pawn(new Position(3, 4), 3),
      Piece.pawn(new Position(3, 5), 3),
      Piece.pawn(new Position(3, 6), 3),
      Piece.pawn(new Position(3, 7), 3),
      Piece.king(new Position(0, 7), 3),
      Piece.rook(new Position(1, 7), 3),
      Piece.rook(new Position(0, 6), 3),
      Piece.knight(new Position(2, 7), 3),
      Piece.knight(new Position(1, 5), 3),
      Piece.bishop(new Position(0, 5), 3),
      Piece.bishop(new Position(2, 6), 3),
      Piece.queen(new Position(1, 6), 3),

      //top right player
      Piece.pawn(new Position(4, 4), 4),
      Piece.pawn(new Position(5, 4), 4),
      Piece.pawn(new Position(6, 4), 4),
      Piece.pawn(new Position(7, 4), 4),
      Piece.pawn(new Position(4, 5), 4),
      Piece.pawn(new Position(4, 6), 4),
      Piece.pawn(new Position(4, 7), 4),
      Piece.king(new Position(7, 7), 4),
      Piece.rook(new Position(6, 7), 4),
      Piece.rook(new Position(7, 6), 4),
      Piece.knight(new Position(5, 6), 4),
      Piece.knight(new Position(7, 5), 4),
      Piece.bishop(new Position(5, 7), 4),
      Piece.bishop(new Position(6, 5), 4),
      Piece.queen(new Position(6, 6), 4),
    ];

    return new GameVariation({
      pieces: pieces,
      width: 8,
      height: 8
    });
  }

  static miniChess() {
    var pieces = [
      //top player
      Piece.pawn(new Position(0, 0), 1),
      Piece.pawn(new Position(1, 0), 1),
      Piece.pawn(new Position(2, 0), 1),
      Piece.pawn(new Position(3, 0), 1),

      //bottom player
      Piece.pawn(new Position(0, 3), 2),
      Piece.pawn(new Position(1, 3), 2),
      Piece.pawn(new Position(2, 3), 2),
      Piece.pawn(new Position(3, 3), 2),
    ];

    return new GameVariation({
      pieces: pieces,
      width: 4,
      height: 4
    });
  }
}

module.exports = GameVariation;
