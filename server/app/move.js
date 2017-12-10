class Move {
  constructor(from, to, initialBoard, moveNum) {
    this._from = from;
    this._to = to;
    this._initialBoard = initialBoard
    this._moveNum = moveNum
  }

  get from() { return this._from }
  get to() { return this._to }
  get moveNum() { return this._moveNum }
  get initialBoard() { return this._initialBoard }

  toJSON() {
    return {
      to: this.to.toJSON(),
      from: this.from.toJSON() };
  }
}

module.exports = Move;
