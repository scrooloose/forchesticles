Pawn = require('./pieces/pawn');
Bishop = require('./pieces/bishop');
Knight = require('./pieces/knight');
King = require('./pieces/king');
Queen = require('./pieces/queen');
Bishop = require('./pieces/bishop');
Rook = require('./pieces/rook');

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
        return JSON.stringify(rv);
    }

    handleMove(move) {
        var firstPiece = this.pieceFor(move.getFrom());
        var secondPiece = this.pieceFor(move.getTo());

        firstPiece.setPosition(move.getTo());

        if (secondPiece) {
            this._pieces.splice(this._pieces.indexOf(secondPiece), 1);
        }
    }

    pieceFor(pos) {
        return this._pieces.find(function(piece) {
            return piece.getPosition().isEqual(pos);
        });
    }

    resetBoard() {
        this._pieces = [
            //bottom left player
            new Pawn({ position: new Position(0, 3), player: 1 }),
            new Pawn({ position: new Position(1, 3), player: 1 }),
            new Pawn({ position: new Position(2, 3), player: 1 }),
            new Pawn({ position: new Position(3, 3), player: 1 }),
            new Pawn({ position: new Position(3, 2), player: 1 }),
            new Pawn({ position: new Position(3, 1), player: 1 }),
            new Pawn({ position: new Position(3, 0), player: 1 }),
            new King({ position: new Position(0, 0), player: 1 }),
            new Rook({ position: new Position(1, 0), player: 1 }),
            new Rook({ position: new Position(0, 1), player: 1 }),
            new Knight({ position: new Position(0, 2), player: 1 }),
            new Knight({ position: new Position(1, 2), player: 1 }),
            new Bishop({ position: new Position(2, 1), player: 1 }),
            new Bishop({ position: new Position(0, 2), player: 1 }),
            new Queen({ position: new Position(1, 1), player: 1 }),

            //bottom right player
            new Pawn({ position: new Position(4, 3), player: 2 }),
            new Pawn({ position: new Position(5, 3), player: 2 }),
            new Pawn({ position: new Position(6, 3), player: 2 }),
            new Pawn({ position: new Position(7, 3), player: 2 }),
            new Pawn({ position: new Position(4, 2), player: 2 }),
            new Pawn({ position: new Position(4, 1), player: 2 }),
            new Pawn({ position: new Position(4, 0), player: 2 }),
            new King({ position: new Position(7, 0), player: 2 }),
            new Rook({ position: new Position(6, 0), player: 2 }),
            new Rook({ position: new Position(7, 1), player: 2 }),
            new Knight({ position: new Position(5, 0), player: 2 }),
            new Knight({ position: new Position(6, 2), player: 2 }),
            new Bishop({ position: new Position(5, 1), player: 2 }),
            new Bishop({ position: new Position(7, 2), player: 2 }),
            new Queen({ position: new Position(6, 1), player: 2 }),

            //top left player
            new Pawn({ position: new Position(0, 4), player: 3 }),
            new Pawn({ position: new Position(1, 4), player: 3 }),
            new Pawn({ position: new Position(2, 4), player: 3 }),
            new Pawn({ position: new Position(3, 4), player: 3 }),
            new Pawn({ position: new Position(3, 5), player: 3 }),
            new Pawn({ position: new Position(3, 6), player: 3 }),
            new Pawn({ position: new Position(3, 7), player: 3 }),
            new King({ position: new Position(0, 7), player: 3 }),
            new Rook({ position: new Position(1, 7), player: 3 }),
            new Rook({ position: new Position(0, 6), player: 3 }),
            new Knight({ position: new Position(2, 7), player: 3 }),
            new Knight({ position: new Position(1, 5), player: 3 }),
            new Bishop({ position: new Position(0, 5), player: 3 }),
            new Bishop({ position: new Position(2, 6), player: 3 }),
            new Queen({ position: new Position(1, 6), player: 3 }),

            //top right player
            new Pawn({ position: new Position(4, 4), player: 4 }),
            new Pawn({ position: new Position(5, 4), player: 4 }),
            new Pawn({ position: new Position(6, 4), player: 4 }),
            new Pawn({ position: new Position(7, 4), player: 4 }),
            new Pawn({ position: new Position(4, 5), player: 4 }),
            new Pawn({ position: new Position(4, 6), player: 4 }),
            new Pawn({ position: new Position(4, 7), player: 4 }),
            new King({ position: new Position(7, 7), player: 4 }),
            new Rook({ position: new Position(6, 7), player: 4 }),
            new Rook({ position: new Position(7, 6), player: 4 }),
            new Knight({ position: new Position(5, 6), player: 4 }),
            new Knight({ position: new Position(7, 5), player: 4 }),
            new Bishop({ position: new Position(5, 7), player: 4 }),
            new Bishop({ position: new Position(6, 5), player: 4 }),
            new Queen({ position: new Position(6, 6), player: 4 }),
        ];
    }
};

module.exports = Board;