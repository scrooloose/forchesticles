import React, { Component } from 'react';
import Board from './Board';
import GameOptions from './GameOptions';
import superagent from 'superagent';
import '../styles/App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      game: null,
      gameId: null
    };
    this.fetchGameInfo();
    this.onJoinGame = this.onJoinGame.bind(this);
    this.onNewGame = this.onNewGame.bind(this);
    this.onMakeMove = this.onMakeMove.bind(this);
    this.onUndoMove = this.onUndoMove.bind(this);
    this.onDeleteGame = this.onDeleteGame.bind(this);
  }

  fetchGameInfo() {
    if (!this.state.gameId) {
      return;
    }

    superagent
      .get('http://localhost:5000/api/v1/games/' + this.state.gameId)
      .end((err, res) => this.setState({game: res.body}) );
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.fetchGameInfo(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onMakeMove(from, to) {
    superagent
      .post('http://localhost:5000/api/v1/games/' + this.state.gameId + '/moves')
      .send({ from: from, to: to })
      .end((err, res) => this.fetchGameInfo());
  }

  onJoinGame(gameId) {
    this.setState({gameId: gameId}, () => this.fetchGameInfo());
  }

  onNewGame() {
    superagent
      .post('http://localhost:5000/api/v1/games/')
      .end((err, res) => {
        this.setState({
          gameId: res.body.gameId,
          game: res.body
        });
      });
  }

  onUndoMove() {
    superagent
      .post('http://localhost:5000/api/v1/games/' + this.state.gameId + '/undos')
      .end((err, res) => this.fetchGameInfo());
  }

  onDeleteGame() {
    superagent
      .post('http://localhost:5000/api/v1/games/' + this.state.gameId + '/delete')
      .end((err, res) => this.setState({gameId: null, game: null}));
  }

  emptyBoard() {
    return new Array(8).fill(new Array(8).fill(null));
  }

  render() {
    let board = null;
    if (!this.state.game) {
      board = <Board pieces={this.emptyBoard()} onMakeMove={this.onMakeMove} />
    } else {
      board = <Board pieces={this.state.game.board} onMakeMove={this.onMakeMove} />
    }

    return (
      <div className="App">
        {board}
        <GameOptions
          gameId={this.state.gameId}
          onJoinGame={this.onJoinGame}
          onNewGame={this.onNewGame}
          onUndoMove={this.onUndoMove}
          onDeleteGame={this.onDeleteGame} />
      </div>
    );
  }
}

export default App;
