class ClientEngine {
  constructor() {
    this.board = new Board(this);
    this.refreshDelay = 5000;
    this.gameId = null;
  }

  _extractHost() {
    if (getQStringParam("host") != undefined) {
      return getQStringParam("host");
    }

    return "localhost";
  }

  newGame() {
    var $this = this;
    $.ajax({
      method: 'POST',
      url: '/api/v1/games',
    }).done(function(resp) {
      var parsedMsg = JSON.parse(resp)
      $this.board.render(parsedMsg.board);
      $this.gameId = parsedMsg.gameId;
    });
  }

  moveMade(s1, s2) {
    var $this = this;
    $.ajax({
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      url: '/api/v1/games/' + this.gameId + '/moves',
      data: JSON.stringify({ from: s1, to: s2 })
    }).done(function(resp) {
      var parsedMsg = JSON.parse(resp);
      $this.board.render(parsedMsg.board);
    });
  }

  undoMove(moveNum) {
    if (!this.gameId) {
      return
    }

    var $this = this;
    $.ajax({
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      url: '/api/v1/games/' + this.gameId + '/undos'
    }).done(function(resp) {
      var parsedMsg = JSON.parse(resp);
      $this.board.render(parsedMsg.board);
    });
  }

  switchGame(gameId) {
    this.gameId = gameId;
    var $this = this;
    $.ajax({
      method: 'GET',
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      url: '/api/v1/games/' + this.gameId
    }).done(function(resp) {
      var parsedMsg = JSON.parse(resp);
      $this.board.render(parsedMsg.board);
    });
  }

  deleteCurrentGame() {
    var $this = this;
    console.log("deleteCurrentGame");
    $.ajax({
      method: 'POST',
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      url: '/api/v1/games/' + this.gameId + '/delete'
    }).done(function(resp) {
      var parsedMsg = JSON.parse(resp);
      $this.board.render(parsedMsg.board);
    });
  }
}

class Board {
  constructor(moveListener) {
    this.addSquareListener();
    this.selectedSquare = null;
    this.moveListener = moveListener;
  }

  addSquareListener() {
    var $this = this;
    $(".square").click(function(event) {
      var square = $(event.target);
      square.addClass("selected");
      $this.squareSelected(square);
    });
  }

  squareSelected(square) {
    if (this.selectedSquare) {
      //send move
      var pos1 = {
        x: this.selectedSquare.data('col'),
        y: this.selectedSquare.data('row')
      }
      var pos2 = {
        x: square.data('col'),
        y: square.data('row')
      }
      this.moveListener.moveMade(pos1, pos2);

      //unselect square
      this.selectedSquare = null;
      $('.square').removeClass("selected");

      //re-render board
    } else {
      this.selectedSquare = square;
    }
  };

  setPieces(boardState) {
    for(var i = 0; i < boardState.length; i++) {
      var piece = boardState[i];
      var square = $('.square[data-col=' + piece.position.x + '][data-row=' + piece.position.y + ']');

      var color = this.colorFor(piece.player);
      var bgCss = "url(" + "images/" + color + "/" + piece.piece.toLowerCase() + ".png" + ")";
      square.css('background-image', bgCss);
    }
  }

  removeAllPieces() {
    for (var col = 0; col < 8; col++) {
      for (var row = 0; row < 8; row++) {
        var square = $('.square[data-col=' + col + '][data-row=' + row + ']');
        square.css('background-image', "");
      }
    }
  }

  render(boardState) {
    this.removeAllPieces();
    this.setPieces(boardState);
  }

  colorFor(playerNum) {
    if (playerNum == 1) {
      return "red";
    } else if (playerNum == 2) {
      return "white";
    } else if (playerNum == 3) {
      return "yellow";
    } else if (playerNum == 4) {
      return "green";
    }
  }
}

const gameLinkClass = 'join-game-link';

class GameList {
  constructor(linkContainer, engine) {
    this._linkContainer = linkContainer;
    this._engine = engine;
  }

  get linkContainer() { return this._linkContainer }
  get engine() { return this._engine }

  update() {
    var $this = this;
    $.ajax({
      method: 'GET',
      url: '/api/v1/games',
    }).done(function(resp) {
      $this._updateUI(JSON.parse(resp));
    });
  }

  _updateUI(gameIds) {
    var html = jQuery.map(gameIds, function(id) {
      return `<a href="#" class="${gameLinkClass}" data-game-id="${id}">Join Game #${id}</a><br>`
    });
    this.linkContainer.html(html);
    this._initLinkClickEvents();
  }

  _initLinkClickEvents() {
    var $this = this;
    $('.' + gameLinkClass).click(function() {
      var gameId = $(this).data('game-id');
      $this.engine.switchGame(gameId);
    });
  }
}
