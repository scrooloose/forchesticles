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
})
