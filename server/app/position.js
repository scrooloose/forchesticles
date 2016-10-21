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
        if (this.x < 0 || this.x > 8)
            throw "Invalid X Coord:" + this.x;

        if (this.y < 0 || this.y > 8)
            throw "Invalid Y Coord:" + this.y;

    }

}

module.exports = Position;
