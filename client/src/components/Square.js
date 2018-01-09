import React, { Component } from 'react';

class Square extends Component {
  constructor() {
    super();
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
  }

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

  pieceFilenameFor({piece, player}) {
    let rv = "/images/pieces/";
    rv = rv + "player" + player + "/";
    rv = rv + piece + ".png";
    return rv;
  }

  pieceForTarget(target) {
    let d = target.attributes.getNamedItem("data-piece");
    return d && d.value;
  }

  playerForTarget(target) {
    let d = target.attributes.getNamedItem("data-player");
    return d && d.value;
  }

  targetContainsPiece(target) {
    return this.pieceForTarget(target) && this.playerForTarget(target);
  }

  handleDragStart(ev) {
    if (!this.targetContainsPiece(ev.target)) {
      ev.preventDefault();
      return;
    }

    let piece = this.pieceForTarget(ev.target);
    let player = this.playerForTarget(ev.target)

    let dropData = {
      player,
      piece,
      sourceClass: ev.target.className,
      sourceSquare: {
        x: this.props.x,
        y: this.props.y
      },
    }

    ev.dataTransfer.setData("application/json", JSON.stringify(dropData));
    ev.dataTransfer.dropEffect = "move";

    var img = new Image();
    img.src = this.pieceFilenameFor({piece, player});
    ev.dataTransfer.setDragImage(img, img.width / 2, img.height / 2);

    ev.target.className = "square";
  }

  handleDragOver(ev) {
    ev.preventDefault();
  }

  handleDragEnter(ev) {
    ev.preventDefault();
  }

  handleDrop(ev) {
    ev.preventDefault();

    let data = JSON.parse(ev.dataTransfer.getData("application/json"));
    let targetSquare = {
      x: parseInt(ev.target.attributes.getNamedItem("data-x").value, 10),
      y: parseInt(ev.target.attributes.getNamedItem("data-y").value, 10)
    }

    //FIXME: this is a disgusting hack to prevent the flicker after the piece is
    //moved, but before the moveMade api call returns and the board is updated.
    //It should really be an event and a state update.
    let newX = targetSquare.x;
    let newY = targetSquare.y;
    let targetEl = document.querySelector(`[data-x='${newX}'][data-y='${newY}'`)
    targetEl.className = data.sourceClass;

    if (JSON.stringify(data.sourceSquare) == JSON.stringify(targetSquare)) {
      return;
    }

    this.props.eventEmitter.emit("moveMade", {
      from: data.sourceSquare,
      to: targetSquare
    });
  }

  render() {
    return (
      <div
        className={this.klassName()}
        onClick={() => this.emitSquareSelected()}
        draggable="true"
        onDragStart={this.handleDragStart}
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}
        onDragEnter={this.handleDragEnter}
        data-player={this.props.player}
        data-piece={this.props.piece}
        data-x={this.props.x}
        data-y={this.props.y}
      />
    );
  }
}

export default Square;
