var chai = require('chai');
var expect = chai.expect;
var Position = require('../app/position');

describe('Position', function() {
    it('toJSON() returns the position as json', function() {
        var pos = new Position(1,2);

        var expected = JSON.stringify({'x': 1, 'y': 2});
        var actual = JSON.stringify(pos.toJSON());

        expect(actual).to.equal(expected);
    });

    it("throws err for invalid x > 7", function() {
        expect(function(){new Position(8,1)}).to.throw(Error);
    });

    it("throws err for invalid x < 0", function() {
        expect(function(){new Position(-1,1)}).to.throw(Error);
    });

    it("throws err for invalid y > 7", function() {
        expect(function(){new Position(1,8)}).to.throw(Error);
    });

    it("throws err for invalid y < -1", function() {
        expect(function(){new Position(1,-1)}).to.throw(Error);
    });
})
