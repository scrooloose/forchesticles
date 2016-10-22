class Piece {
    constructor(args) {
        if (args["player"] == undefined) throw new Error("player expected");
        if (args["position"] == undefined) throw new Error("position expected");

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
