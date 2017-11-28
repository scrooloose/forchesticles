class Position {
    constructor(x,y) {
        this._x = x;
        this._y = y;

        this._validatePos();
    }

    getX() { return this._x };
    getY() { return this._y };

    toJSON() {
        return { "x": this._x, "y": this._y };
    }

    isEqual(that) {
        return this._x == that._x && this._y == that._y;
    };

    _validatePos() {
        if (this._x < 0 || this._x > 7)
            throw new Error("Invalid X Coord:" + this._x);

        if (this._y < 0 || this._y > 7)
            throw new Error("Invalid Y Coord:" + this._y);

    }

}

module.exports = Position;
