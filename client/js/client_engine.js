function ClientEngine() {
    this.serverHost = this._extractHost();
    this.serverPort = 9378;
    this.board = new Board(this);
    this.socket = null;
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
        console.log($this.socket.send("GetBoard"));

        window.setInterval(function() {
            $this.socket.send("GetBoard");
        }, 5000);

    };

    this.socket.onmessage = function(message) {
        $this.board.render(JSON.parse(message.data));
    };

}

ClientEngine.prototype.moveMade = function(s1, s2) {
    console.log("move");
    move = JSON.stringify({ from: s1, to: s2 });
    this.socket.send(move);
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
        if(piece.player == 1) {
            //console.log(piece.position);
        }
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
