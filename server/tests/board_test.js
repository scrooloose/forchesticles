var chai = require('chai');
var expect = chai.expect;
var Board = require('../app/board');
var Move = require('../app/move');

describe('Board', function() {
    it("toJSON() outputs the pieces", function() {
        //just test that this runs for now
        var json = new Board().toJSON()
        expect(json).to.not.be.empty;
    });

    function ValidPiece({x=1, y=1, player=1}) {
        return new Piece({ player: player, position: new Position(x,y) });
    }

    function ValidMove({x1=1, y1=1, x2=2, y2=2}) {
        return new Move(new Position(x1,y1),
                        new Position(x2,y2));
    }

    it("handleMove() moves the piece", function() {
        piece = ValidPiece({x: 1, y: 1});
        var board = new Board({
            pieces: [piece]
        });

        board.handleMove(ValidMove({x1: 1, y1: 1, x2: 4, y2: 4}));

        expect(board.pieceFor(new Position(4,4))).to.equal(piece);
    });

    it("handleMove() removes the captured piece", function() {
        p1 = ValidPiece({x: 1, y: 1, player: 1});
        p2 = ValidPiece({x: 4, y: 4, player: 2})

        var board = new Board({
            pieces: [p1, p2]
        });

        board.handleMove(ValidMove({x1: 1, y1: 1, x2: 4, y2: 4}));

        expect(board.getPieces().includes(p2)).to.be;
    });
});
