import React, { Component } from 'react';
import GameList from './GameList';

class GameOptions extends Component {

  newGame() { this.props.eventEmitter.emit("newGame"); }
  undoMove() { this.props.eventEmitter.emit("undoMove"); }
  deleteGame() { this.props.eventEmitter.emit("deleteGame"); }

  render() {
    return (
      <div className="game-options">

        <div className="game-buttons" style={{marginTop: "10px"}}>
          <button onClick={() => this.newGame()}>New Game</button>
          &nbsp;
          <button onClick={() => this.undoMove()}>Undo</button>
          &nbsp;
          <button onClick={() => this.deleteGame()} style={{color: 'red'}}>Delete Game</button>
        </div>

        <GameList
          eventEmitter={this.props.eventEmitter}
          gameId={this.props.gameId}
          onJoinGame={this.props.onJoinGame} />
      </div>
    );
  }
}

export default GameOptions;
