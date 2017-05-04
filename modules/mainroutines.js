//Array for all Lobbys
var lobbys = [];
// Any socket.io related functions are at ./modules/io.js
var io;

// Creates the MainRoutines-object and returns it.
module.exports = function(server){
    return new MainRoutines(server);
}

// Constructor
function MainRoutines(server){
    io = require('./io.js')(server);
}

// Returns the io-object.
MainRoutines.prototype.getIo = function(){
    return io;
}

// Returns the lobby-array.
MainRoutines.prototype.getAllLobbys = function(){
    return lobbys;
}

// Returns a specific lobby.
MainRoutines.prototype.getLobby = function(lobbyname){
    var lobbyIndex = lobbys.indexOf(lobbyname);
    if(lobbyIndex >= 0){
        return lobbys[lobbyIndex];
    }else{
        return false;
    }
}

// Creates a lobby-object and stores it in the lobby-array. Returns true if it was successfully or false if the lobbyname is been taken.
MainRoutines.prototype.createLobby = function(data){
    for(var i=0; i<lobbys.length; i++){
        if(lobbys[i].name == data.lobbyName){
            return false;
        }
    }
    console.log(data);
    let lobby = new Lobby(io, data);
    lobbys.push(lobby);
    return true;
}

// Joins a user to a specific lobby.
MainRoutines.prototype.joinLobby = function(data){
    var lobbyIndex = lobbys.indexOf(data.lobby.name);
    if(lobbyIndex !== -1){
        var playerIndex = lobbys[lobbyIndex].players.indexOf(data.user.id);
        if(playerIndex !== -1){
            lobbys[i].addPlayer(data.user);
        }
    }
}

// Generates the map
/** Not implemented yet **/
MainRoutines.prototype.generateMap = function(data){
    return true;
}
