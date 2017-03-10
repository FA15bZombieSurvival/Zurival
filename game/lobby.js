// Private
var mapId,
    name,
    maxPlayers,
    survivingTime,
    enemyTypes;

// Time object for applying delta to movements
let time = {
    delta_start : new Date().getTime(),
    delta_end : new Date().getTime(),
    delta : 0
};
time.delta = new Date().getTime() - time.delta_end;

//private functions are written like this
function dummy(dummyValue1) {
  return dummyValue1 - 0.1;
}

// Public
module.exports = Lobby;

Lobby.prototype.players = [];

// Constructor
function Lobby(data) {
    this.name = data.name;
    this.host = data.user;
    this.maxPlayers = data.maxPlayers;
    this.survivingTime = data.survivingTime;
    this.enemyTypes = data.enemyTypes;

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
    players.push(new Player(data));
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
