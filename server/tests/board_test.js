var chai = require('chai');
var expect = chai.expect;
var Board = require('../app/board');

describe('Board', function() {
    it("toJSON() outputs the pieces", function() {
        //just test that this runs for now
        var json = new Board().toJSON
        expect(json).to.not.be.empty;
    });
});
