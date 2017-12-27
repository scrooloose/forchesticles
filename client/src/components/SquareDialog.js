import React, { Component } from 'react';

const Players = ["1","2","3","4"];
const Pieces = ["King", "Queen", "Rook", "Bishop", "Knight", "Pawn"];

class SquareDialog extends Component {

  constructor(props) {
    super(props);
    this.emitPromoteSquare = this.emitPromoteSquare.bind(this);
  }

  emitPromoteSquare({player, piece}) {
    this.props.eventEmitter.emit(
      "promoteSquare", {
        player,
        piece
      }
    );
  }

  setPieceLink(piece, player) {
    return (
      <a onClick={() => this.emitPromoteSquare({piece, player})}>
        <img src={`/images/pieces/player${player}/${piece.toLowerCase()}.png`} alt={piece} />
      </a>
    )
  }

  render() {
    return (
      <div className="piece-dialog">
        <h2>Piece Promotion</h2>
        <p>Select the replacement piece</p>

        {Players.map(player => (
          <div>
            {Pieces.map(piece => this.setPieceLink(piece, player))}
          </div>
        ))}
      </div>
    );
  }
}

export default SquareDialog;
