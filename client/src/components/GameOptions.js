import React, { Component } from 'react';
import GameList from './GameList';

class GameOptions extends Component {
  render() {
    return (
      <div className="game-options">

        <div className="game-buttons" style={{marginTop: "10px"}}>
          <button onClick={this.props.onNewGame}>New Game</button>
          &nbsp;
          <button onClick={this.props.onUndoMove}>Undo</button>
          &nbsp;
          <button onClick={this.props.onDeleteGame} style={{color: 'red'}}>Delete Game</button>
        </div>

        <GameList
          gameId={this.props.gameId}
          onJoinGame={this.props.onJoinGame} />
      </div>
    );
  }
}

export default GameOptions;
