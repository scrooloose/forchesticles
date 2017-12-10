import React, { Component } from 'react';

class Square extends Component {
  emitSquareSelected() {
    this.props.eventEmitter.emit(
      "squareSelected",
      this.props
    );
  }

  klassName() {
    var klasses = [ 'square', this.props.piece, this.props.klass ];
    if (this.props.player) {
      klasses.push('player-' + this.props.player);
    }

    if (this.props.selected) {
      klasses.push('selected');
    }

    if (this.props.inLastMove) {
      klasses.push('in-last-move');
    }

    return klasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.klassName()}
        onClick={() => this.emitSquareSelected()} />
    );
  }
}

export default Square;
