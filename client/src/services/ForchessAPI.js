class ForchessAPI {
  getGameIds() {
    return this._getPromiseForGet('http://localhost:5000/api/v1/games/');
  }

  getGame(id) {
    return this._getPromiseForGet('http://localhost:5000/api/v1/games/' + id);
  }

  sendMove({gameId, from, to}) {
    return this._getPromiseForPost({
      url: 'http://localhost:5000/api/v1/games/' + gameId + '/moves',
      body: {from: from, to: to}
    });
  }

  newGame() {
    return this._getPromiseForPost({ url: 'http://localhost:5000/api/v1/games/' });
  }

  undoMove(gameId) {
    return this._getPromiseForPost({ url: 'http://localhost:5000/api/v1/games/' + gameId + '/undos' });
  }

  deleteGame(gameId) {
    return this._getPromiseForPost({ url: 'http://localhost:5000/api/v1/games/' + gameId + '/delete' });
  }

  _getPromiseForGet(url) {
    return fetch(url).then((resp) => resp.json());
  }

  _getPromiseForPost({url, body={}}) {
    return fetch(
        url, {
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(body)
      }
    ).then((resp) => resp.json());
  }
}

module.exports = new ForchessAPI();
