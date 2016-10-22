var chai = require('chai');
var expect = chai.expect;
var Piece = require('../app/pieces/piece');

describe('Piece', function() {

    function ValidPiece(args) {
        validArgs = Object.assign({ player: 1, position: new Position(1,1) }, args);
        return new Piece(validArgs);
    }

    it("requires a player", function() {
        expect(function(){ ValidPiece({player: null})}).to.throw(Error);
    });

    it("requires a position", function() {
        expect(function(){ ValidPiece({position: null})}).to.throw(Error);
    });

    it("toJSON() outputs json", function() {
        //FIXME: just testing that this runs for now
        json = (ValidPiece()).toJSON()
        expect(json).to.not.be.empty;
    });
});
