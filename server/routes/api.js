var express = require('express');
var router = express.Router();

var gameRepo = require('../app/game_repo');
var position = require('../app/position');

router.use(function (req, res, next) {
  res.header("Content-Type",'application/json');
  next();
});

router.post('/games', function(req, res, next) {
  res.send(gameRepo.createNewGame().toJSON());
});

router.get('/games', function(req, res, next) {
  res.send(JSON.stringify(gameRepo.allGameIds()));
});

router.get('/games/:id', function(req, res, next) {
  res.send(
    gameRepo.find(req.params.id).toJSON()
  );
});

router.post('/games/:id/delete', function(req, res, next) {
  gameRepo.destroy(req.params.id);
  res.send({result: "OK"});
});

router.post('/games/:game_id/moves', function(req, res, next) {
  game = gameRepo.find(req.params.game_id);

  game.handleMove(
    new Position(req.body.from.x, req.body.from.y),
    new Position(req.body.to.x, req.body.to.y)
  );
  res.send(JSON.stringify(game.toJSON()));
});

router.post('/games/:game_id/undos', function(req, res, next) {
  game = gameRepo.find(req.params.game_id);
  game.undoMove();
  res.send(JSON.stringify(game.toJSON()));
});

router.post('/games/:game_id/promote_square', function(req, res, next) {
  let game = gameRepo.find(req.params.game_id);
  let pos = new Position(req.body.square.x, req.body.square.y);
  let player = req.body.player;
  let piece = new Piece(req.body.piece, pos, player);
  game.promoteSquare(pos, piece);
  res.send(JSON.stringify(game.toJSON()));
});

module.exports = router;
