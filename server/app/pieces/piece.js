class Piece {
    constructor(args) {
        if (args["player"] == undefined) throw new Error("player expected");
        if (args["position"] == undefined) throw new Error("position expected");

        this._player = args.player;
        this._position = args.position;
    }

    getPlayer() { return this._player }
    getPosition() { return this._position }

    setPosition(pos) { this._position = pos; }

    toJSON() {
        return {
            "piece": this.constructor.name,
            "player": this._player,
            "position": this._position.toJSON()
        }
    }
};

module.exports = Piece;
