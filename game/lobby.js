// Private
var mapId,
    name,
    maxPlayers,
    survivingTime,
    enemyTypes,
    socket;

var players;

// Time object for applying delta to movements
let time = {
    delta_start : new Date().getTime(),
    delta_end : new Date().getTime(),
    delta : 0
};
time.delta = new Date().getTime() - time.delta_end;

// Public
module.exports = Lobby;

// Constructor
function Lobby(socket, data) {
    this.name = data.lobbyName;
    this.host = data.user;
    this.maxPlayers = data.maxPlayers;
    this.survivingTime = data.survivingTime;
    this.enemyTypes = data.enemyTypes;
    this.socket = socket.join(this.name);
    let playerData;
    playerData.userID = this.host;
    let hostSocket = socket.getClient(this.host);
    if(hostSocket != null){
        hostSocket.join(this.name);
        playerData.socket = hostSocket;
    }
    addPlayer(playerData);
}

Lobby.prototype.update = function(delta){
    // Update enemies
    for (var i = 0; i < enemys.length; i++) {
        enemys[i].update(delta);
    }

    // Update players
    for (var i = 0; i < players.length; i++) {
        players[i].update(delta);
    }
}

Lobby.prototype.generateWorld = function(data){
    this.mapId = data.value._id;
    // Create map with given number of tiles
    var worldInTilesWidth = 100,
        worldInTilesHeight = 100,
        tileSize = 64;

    // World coordinates in pixels
    const WORLD_PIXEL_WIDTH = worldInTilesWidth * tileSize;
    const WORLD_PIXEL_HEIGHT = worldInTilesHeight * tileSize;
    console.log(WORLD_PIXEL_HEIGHT + ' / ' + WORLD_PIXEL_WIDTH);
}

Lobby.prototype.addPlayer = function(data){
    var player = new Player(data);
    // get the client-Socket from the /lobby namespace
    var playerSocket = socket.getClient(player.userID, '/lobby');
    // let him join the lobby-Room
    playerSocket.join(this.name);
    // set the player.socket
    player.socket = playerSocket;
    players.push(player);
}

// Removes a player from the lobby.
Lobby.prototype.removePlayer = function(userID){
    var index = players.indexOf(userID);
    if(index >= 0){
        var player = players[index];
        socket.removeClientFromNamespace(player.userID);
        players.splice(index, 1);
    }
}

// Game servers loop that calculates the delta time and saves it in a json object
setInterval(function(){
    time.delta_start = new Date().getTime() - time.delta_end;
    time.delta = time.delta_start/1000;

    time.delta_end = new Date().getTime();

    //update(time.delta);
}, 4);

/*
// Imports
let Enemy = require("./entities/enemy.js");
let Player = require("./entities/player.js");

// Array for different objects
let enemys = [
    new Enemy(10, 10, "#FF0000"),
    new Enemy(130, 30, "#00FF00")
];
let players = [];
*/
