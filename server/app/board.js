Piece = require('./piece');
Position = require('./position');

class Board {
    constructor({pieces=[]} = {}) {
        this._pieces = pieces;

        if (this._pieces.length == 0)
            this.resetBoard();
    }

    getPieces() { return this._pieces }

    toJSON() {
        var rv = [];
        this._pieces.forEach(function(piece){
            rv.push(piece.toJSON());
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

    pieceFor(pos) {
        return this._pieces.find(function(piece) {
            return piece.position.isEqual(pos);
        });
    }

    resetBoard() {
        this._pieces = [
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
    }

    clone() {
    }
};

module.exports = Board;
