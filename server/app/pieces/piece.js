class Piece {
    constructor(args) {
        this.player = args.player;
        this.position = args.position;
    }

    toJSON() {
        return {
            "piece": this.constructor.name,
            "player": this.player,
            "position": this.position.toJSON()
        }
    }
};

module.exports = Piece;
