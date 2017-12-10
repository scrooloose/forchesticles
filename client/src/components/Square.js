import React, { Component } from 'react';

class Square extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onSquareSelected(this.props)
  }

  klassName() {
    var klasses = [ 'square', this.props.piece, this.props.klass ];
    if (this.props.player) {
      klasses.push('player-' + this.props.player);
    }

    if (this.props.selected) {
      klasses.push('selected');
    }

    return klasses.join(' ');
  }

  render() {
    return (
      <div
         className={this.klassName()}
         onClick={this.handleClick} />
    );
  }
}

export default Square;
