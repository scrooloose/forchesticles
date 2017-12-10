import React, { Component } from 'react';
import superagent from 'superagent';

const RefreshRate = 1000;

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = { availableGameIds: [] };
    this.refreshAvailableGames();
  }

  refreshAvailableGames() {
    let $this = this
    superagent
      .get('http://localhost:5000/api/v1/games/')
      .end((err, res) => {
        $this.setState({availableGameIds: JSON.parse(res.body)})
      });
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.refreshAvailableGames(), RefreshRate);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  joinLink(gameId) {
    if (gameId === this.props.gameId) {
      return (
        <span>Game #{gameId}</span>
      )
    } else {
      return (
        <a href={"#game-" + gameId} data-game-id={gameId} onClick={() => this.props.onJoinGame(gameId)}>
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
