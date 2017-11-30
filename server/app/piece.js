class Piece {
    static pawn(pos, player)   { return new Piece("Pawn", pos, player) }
    static bishop(pos, player) { return new Piece("Bishop", pos, player) }
    static knight(pos, player) { return new Piece("Knight", pos, player) }
    static rook(pos, player)   { return new Piece("Rook", pos, player) }
    static queen(pos, player)  { return new Piece("Queen", pos, player) }
    static king(pos, player)   { return new Piece("King", pos, player) }

    constructor(pieceName, position, player) {
        this._pieceName = pieceName;
        this._player = player;
        this._position = position;
    }

    get player()    { return this._player }
    get position()  { return this._position }
    get pieceName() { return this._pieceName }

    set position(pos) { this._position = pos; }

    toJSON() {
        return {
            "piece": this.pieceName,
            "player": this.player,
            "position": this.position.toJSON()
        }
    }
};

module.exports = Piece;
