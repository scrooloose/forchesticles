Game = require("./game");

class GameRepo {
  constructor() {
    this.games = {};
    this.nextGameId = 1;
  }

  createNewGame() {
    var game = new Game(this.nextGameId);
    this.games[this.nextGameId] = game;
    this.nextGameId++;
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

