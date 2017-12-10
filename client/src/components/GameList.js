import React, { Component } from 'react';
import ForchessAPI from '../services/ForchessAPI';

const RefreshRate = 3000;

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = { availableGameIds: [] };
    this.refreshAvailableGames();
    this.props.eventEmitter.on("gameCreated", () => this.refreshAvailableGames());
    this.props.eventEmitter.on("gameDeleted", () => this.refreshAvailableGames());
  }

  refreshAvailableGames() {
    ForchessAPI.getGameIds()
      .then((ids) => { this.setState({availableGameIds: ids}) } )
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.refreshAvailableGames(), RefreshRate);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  emitJoin(gameId) {
    this.props.eventEmitter.emit("gameJoined", {gameId: gameId})
  }

  joinLink(gameId) {
    if (parseInt(gameId,10) === parseInt(this.props.gameId, 10)) {
      return (
        <span>Game #{gameId} &#x2190; </span>
      )
    } else {
      return (
        <a href={"#game-" + gameId} data-game-id={gameId} onClick={() => this.emitJoin(gameId)}>
          Game #{gameId}
        </a>
      )
    }
  }

  render() {
    if (!this.state.availableGameIds.length) {
      return <p>No games yet</p>;
    }

    return (
      <div id="join-game-links">
        <p>Available Games:</p>
        <ul>
          {this.state.availableGameIds.map(id =>
            <li key={id}>
              {this.joinLink(id)}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default GameList;
