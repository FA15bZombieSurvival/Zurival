var socket = io();

// Time object for applying delta to movements
let time = {
    delta_start : new Date().getTime(),
    delta_end : new Date().getTime(),
    delta : 0
};
time.delta = new Date().getTime() - time.delta_end;

// Create map with given number of tiles
var worldInTilesWidth = 100,
    worldInTilesHeight = 100,
    tileSize = 64;

// World coordinates in pixels
const WORLD_PIXEL_WIDTH = worldInPixelWidth * tileSize;
const WORLD_PIXEL_HEIGHT = worldInPixelHeight * tileSize;
console.log(WORLD_PIXEL_HEIGHT + ' / ' + WORLD_PIXEL_WIDTH);

// Imports
let Enemy = require("./entities/enemy.js");
let Player = require("./entities/player.js");

// Array for different objects
let enemys = [];
let players = [];

// Updates all entities
function update(delta){
    // Update enemies
    for (var i = 0; i < enemys.length; i++) {
        enemys[i].update(delta);
    }

    // Update players
    for (var i = 0; i < players.length; i++) {
        players[i].update(delta);
    }
}

// Game servers loop that calculates the delta time and saves it in a json object
setInterval(function(){
    time.delta_start = new Date().getTime() - time.delta_end;
    time.delta = time.delta_start/1000;

    time.delta_end = new Date().getTime();

    update(time.delta);
}, 4);

socket.on('addEnemys', function (data) {
    data.forEach(addEnemy);
});

function addEnemy(element, index, array){
    enemys.push(new Enemy(element));
}
