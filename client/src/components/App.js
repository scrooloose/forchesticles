import React, { Component } from 'react';
import Board from './Board';
import GameOptions from './GameOptions';
import superagent from 'superagent';
import '../styles/App.css';
import events from 'events';

class App extends Component {

  constructor() {
    super();
    this.state = {
      game: null,
      gameId: null
    };
    this.fetchGameInfo();

    this.eventEmitter = new events.EventEmitter();
    this.eventEmitter.on("moveMade", (args) => this.handleMove(args))
    this.eventEmitter.on("gameJoined", (args) => this.handleGameJoined(args))
    this.eventEmitter.on("newGame", (args) => this.handleNewGame(args))
    this.eventEmitter.on("undoMove", (args) => this.handleUndoMove(args))
    this.eventEmitter.on("deleteGame", (args) => this.handleDeleteGame(args))
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

  handleMove({from, to}) {
    superagent
      .post('http://localhost:5000/api/v1/games/' + this.state.gameId + '/moves')
      .send({ from: from, to: to })
      .end((err, res) => this.fetchGameInfo());
  }

  handleGameJoined({gameId}) {
    this.joinGame(gameId);
  }

  joinGame(gameId) {
    this.setState({gameId: gameId}, () => this.fetchGameInfo());
  }

  handleNewGame() {
    superagent
      .post('http://localhost:5000/api/v1/games/')
      .end((err, res) => {
        this.joinGame(res.body.gameId);
        this.eventEmitter.emit("gameCreated");
      });
  }

  handleUndoMove() {
    superagent
      .post('http://localhost:5000/api/v1/games/' + this.state.gameId + '/undos')
      .end((err, res) => this.fetchGameInfo());
  }

  handleDeleteGame() {
    superagent
      .post('http://localhost:5000/api/v1/games/' + this.state.gameId + '/delete')
      .end((err, res) => {
        this.setState({gameId: null, game: null});
        this.eventEmitter.emit("gameDeleted");
      }
    );
  }

  emptyBoard() {
    return new Array(8).fill(new Array(8).fill(null));
  }

  render() {
    let pieces = this.state.game ? this.state.game.board : this.emptyBoard();

    return (
      <div className="App">
        <Board
          pieces={pieces}
          eventEmitter={this.eventEmitter} />
        <GameOptions
          eventEmitter={this.eventEmitter}
          gameId={this.state.gameId}
          onUndoMove={this.onUndoMove}
          onDeleteGame={this.onDeleteGame} />
      </div>
    );
  }
}

export default App;
