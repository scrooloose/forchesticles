Game = require("./game");

class GameRepo {
  constructor() {
    this._games = {};
    this._nextGameId = 1;
  }

  get games() { return this._games }
  get nextGameId() { return this._nextGameId }

  createNewGame() {
    var game = new Game(this.nextGameId);
    this.games[this.nextGameId] = game;
    this._nextGameId++;
    return game;
  }

  find(id) {
    return this.games[id];
  }

  allGameIds() {
    return Object.keys(this.games);
  }

  destroy(gameId) {
    delete this.games[gameId];
  }
}

module.exports = new GameRepo();

