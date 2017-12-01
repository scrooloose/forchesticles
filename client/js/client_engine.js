function ClientEngine() {
    this.serverHost = this._extractHost();
    this.serverPort = 9378;
    this.board = new Board(this);
    this.socket = null;
    this.refreshDelay = 5000;
    this.gameId = null;
}

ClientEngine.prototype._extractHost = function() {
    if (getQStringParam("host") != undefined) {
        return getQStringParam("host");
    }

    return "localhost";
}

ClientEngine.prototype.start = function() {
    var $this = this;

    this.socket = new WebSocket('ws://' + this.serverHost + ':' + this.serverPort);

    this.socket.onopen = function() {
        $this.socket.send(JSON.stringify({
            call: "NewGame"
        }));

        window.setInterval(function() {
            $this.socket.send(
                JSON.stringify({
                    call: "GetBoard",
                    args: { game_id: $this.gameId }
                })
            );
        }, $this.refreshDelay);

    };

    this.socket.onmessage = function(message) {
        var parsedMsg = JSON.parse(message.data)
        $this.gameId = parsedMsg.gameId;
        $this.board.render(parsedMsg.board);
    };

}

ClientEngine.prototype.moveMade = function(s1, s2) {
    this._sendReq(
        "DoMove",
        { game_id: this.gameId, from: s1, to: s2 }
    );
}

ClientEngine.prototype.undoMove = function(moveNum) {
    this._sendReq(
        "UndoMove",
        { game_id: this.gameId }
    );
}

ClientEngine.prototype._sendReq = function(call, args) {
    this.socket.send(
        JSON.stringify({
            call: call,
            args: args
        })
    );
}

// Add movelistener or similar for board to send moves back to engine

function Board(moveListener) {
    this.addSquareListener();
    this.selectedSquare = null;
    this.moveListener = moveListener;
}

Board.prototype.addSquareListener = function() {
    $this = this;
    $(".square").click(function(event) {
        var square = $(event.target);
        square.addClass("selected");
        $this.squareSelected(square);
    });
}

Board.prototype.squareSelected = function(square) {
    if (this.selectedSquare) {
        //send move
        pos1 = {
            x: this.selectedSquare.data('col'),
            y: this.selectedSquare.data('row')
        }
        pos2 = {
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

Board.prototype.setPieces = function(boardState) {
    for(i = 0; i < boardState.length; i++) {
        var piece = boardState[i];
        var square = $('.square[data-col=' + piece.position.x + '][data-row=' + piece.position.y + ']');

        var color = this.colorFor(piece.player);
        var bgCss = "url(" + "images/" + color + "/" + piece.piece.toLowerCase() + ".png" + ")";
        square.css('background-image', bgCss);
    }
}

Board.prototype.removeAllPieces = function() {
    for (var col = 0; col < 8; col++) {
        for (var row = 0; row < 8; row++) {
            var square = $('.square[data-col=' + col + '][data-row=' + row + ']');
            square.css('background-image', "");
        }
    }
}

Board.prototype.render = function(boardState) {
    this.removeAllPieces();
    this.setPieces(boardState);
}

Board.prototype.colorFor = function(playerNum) {
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
