class ForchessAPI {
  constructor({baseurl}) {
    this.baseurl = baseurl;
  }

  getGameIds() {
    return this._getPromiseForGet('/games');
  }

  getGame(id) {
    return this._getPromiseForGet('/games/' + id);
  }

  sendMove({gameId, from, to}) {
    return this._getPromiseForPost({
      url: '/games/' + gameId + '/moves',
      body: {from: from, to: to}
    });
  }

  newGame() {
    return this._getPromiseForPost({ url: '/games/' });
  }

  undoMove(gameId) {
    return this._getPromiseForPost({ url: '/games/' + gameId + '/undos' });
  }

  deleteGame(gameId) {
    return this._getPromiseForPost({ url: '/games/' + gameId + '/delete' });
  }

  _getPromiseForGet(url) {
    return fetch(this.baseurl + url).then((resp) => resp.json());
  }

  _getPromiseForPost({url, body={}}) {
    return fetch(
        this.baseurl + url, {
        headers: { 'Content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(body)
      }
    ).then((resp) => resp.json());
  }
}

module.exports = new ForchessAPI({baseurl: process.env.REACT_APP_FORCHESS_API_BASEURL});
