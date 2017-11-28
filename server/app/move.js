class Move {
    constructor(from, to) {
        this._from = from;
        this._to = to;
    }

    getFrom() { return this._from }
    getTo() { return this._to }
}

module.exports = Move;
