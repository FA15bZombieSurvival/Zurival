const socketio = require('socket.io');
const UUID = require('uuid/v4');

var Player = require("./entities/player");

module.exports.invoke = function(server) {
    var io = socketio.listen(server);

    // Player connects into the game
    io.sockets.on('connection', function onConnection(client){
        client.userid = UUID();
        client.emit("connected", { id: client.userid } );
        console.log('player ' + client.userid + ' connected ');

        client.on("disconnect", function(){
            console.log('client disconnected ' + client.userid );
        });
        client.on("playerMovement", onPlayerMovement);
        client.on("playerAttack", onPlayerAttack);
        client.on("playerHotbarInput", onHotbarInput);
        client.on("playerReloadInput", onReloadInput)
        client.on("playerInventoryInput", onInventoryInput)
    });


};

function onPlayermovement(data){
  //TODO: Spieler aktualisieren
  /*
  Player.x = data.x;
  Player.y = data.y;
  Player.facing = data.facing;
  */
  var game = games[this.gameId]

  var movingPlayer = game.players[this.id]

  if(!movingPlayer){
    return;
  }

  movingPlayer.x = data.x;
  movingPlayer.y = data.y;
  movingPlayer.facing = data.facing;
  movingPlayer.hasMoved = true;
};
function onPlayerAttack(attack){

};
function onHotbarInput(hotkey){

};
function onReloadInput(reload){

};
function onInventoryInput(inventory){

};

function broadcastingLoop(){
  for(var g in games) {
		var game = games[g];
		for(var i in game.players) {
			var player = game.players[i];
			if(player.alive && player.hasMoved) {
				io.to(g).emit("move", {id: player.id, x: player.x, y: player.y, f: player.facing});
				player.hasMoved = false;
			}
		}
	}
};
