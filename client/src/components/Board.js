import React, { Component } from 'react';
import Square from './Square';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: { }
    }

    this.props.eventEmitter.on(
      "squareSelected", (args) => this.handleSquareSelected(args)
    )
  }

  handleSquareSelected(square) {
    if(!this.aSquareIsSelected()) { //no selected square
      this.setState({ selected: square })
    } else {
      if (this.isSelected(square)) {
        this.setState({selected: {}});
        return;
      }

      this.setState({selected: {}});
      this.props.eventEmitter.emit(
        "moveMade",
        {from: this.state.selected, to: { x: square.x, y: square.y }}
      );

    }
  }

  isSelected({x, y}) {
    return this.aSquareIsSelected() && this.state.selected.x === x && this.state.selected.y === y;
  }

  aSquareIsSelected() {
    return Object.keys(this.state.selected).length !== 0;
  }

  pieceFor(x,y) {
    return this.props.pieces[y][x];
  }

  squareFor(x,y) {
    var piece = this.pieceFor(x,y);
    var key = parseInt(y, 10) * 8 + parseInt(x, 10);
    var selected = this.isSelected({x,y});

    return (
      <Square
        key={key}
        x={x} y={y}
        piece={piece && piece.piece.toLowerCase()}
        player={piece && piece.player}
        selected={selected}
        eventEmitter={this.props.eventEmitter}
        onSquareSelected={this.handleSquareSelected} />
    );
  }

  render() {
    var rowKey = 0;
    return (
      <div className="board group">
        {[7,6,5,4,3,2,1,0].map(y => (
          <div className="row" key={rowKey++}>
            {[0,1,2,3,4,5,6,7].map(x => (
              this.squareFor(x,y)
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Board;
