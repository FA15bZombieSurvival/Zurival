//Array for all Lobbys
var lobbys = [];
// Any socket.io related functions are at ./modules/io.js
var io;

module.exports = function(server){
    return new MainRoutines(server);
}

function MainRoutines(server){
    io = require('./io.js')(server);
}

MainRoutines.prototype.getIo = function(){
    return io;
}

MainRoutines.prototype.getAllLobbys = function(){
    return lobbys;
}

MainRoutines.prototype.getLobby = function(data){
    var lobbyIndex = lobbys.indexOf(data.lobbyname);
    if(lobbyIndex >= 0){
        return lobbys[lobbyIndex];
    }else{
        return false;
    }
}

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

MainRoutines.prototype.joinLobby = function(data){
    var lobbyIndex = lobbys.indexOf(data.lobby.name);
    if(lobbyIndex !== -1){
        var playerIndex = lobbys[lobbyIndex].players.indexOf(data.user.id);
        if(playerIndex !== -1){
            lobbys[i].addPlayer(data.user);
        }
    }
}

MainRoutines.prototype.generateMap = function(data){
    return true;
}
