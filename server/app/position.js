class Position {
    constructor(x,y) {
        this.x = x;
        this.y = y;

        this._validatePos();
    }

    toJSON() {
        return { "x": this.x, "y": this.y };
    }

    _validatePos() {
        if (this.x < 0 || this.x > 7)
            throw new Error("Invalid X Coord:" + this.x);

        if (this.y < 0 || this.y > 7)
            throw new Error("Invalid Y Coord:" + this.y);

    }

}

module.exports = Position;
