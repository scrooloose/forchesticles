import React, { Component } from 'react';
import Board from './Board';
import GameOptions from './GameOptions';
import '../styles/App.css';
import events from 'events';
import ForchessAPI from '../services/ForchessAPI';

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

    ForchessAPI.getGame(this.state.gameId).then(
      (res) => this.setState({game: res})
    );
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.fetchGameInfo(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleMove({from, to}) {
    ForchessAPI.sendMove({
      gameId: this.state.gameId,
      from: from,
      to: to
    }).then(() => this.fetchGameInfo())
  }

  handleGameJoined({gameId}) {
    this.joinGame(gameId);
  }

  joinGame(gameId) {
    this.setState({gameId: gameId}, () => this.fetchGameInfo());
  }

  handleNewGame() {
    ForchessAPI.newGame().then((res) => {
      this.joinGame(res.gameId);
      this.eventEmitter.emit("gameCreated");
    });
  }

  handleUndoMove() {
    ForchessAPI.undoMove(this.state.gameId)
      .then(() => this.fetchGameInfo());
  }

  handleDeleteGame() {
    ForchessAPI.deleteGame(this.state.gameId).then((res) => {
      this.setState({gameId: null, game: null});
      this.eventEmitter.emit("gameDeleted");
    });
  }

  emptyBoard() {
    return new Array(8).fill(new Array(8).fill(null));
  }

  render() {
    let pieces = this.state.game ? this.state.game.board : this.emptyBoard();
    let lastMove = this.state.game ? this.state.game.lastMove : null;

    return (
      <div className="App">
        <Board
          lastMove={lastMove}
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
