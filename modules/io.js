const socketio      = require('socket.io');
const socketioJwt   = require("socketio-jwt");

var socket      = null,
    lobbySocket = null,
    chatSocket  = null;

// Creates the io-object and returns it.
module.exports = function(server){
    return new io(server);
}

// Constructor
function io(server){
    socket = socketio.listen(server);
    chatSocket = socket.of('/chat');
    lobbySocket = socket.of('/lobby');
    nspChat();
    nspLobby();
}

// The chat namespace, where all clients were connected when they login.
function nspChat(){
    chatSocket.use(socketioJwt.authorize({
        secret: "MY_SECRET",    //TODO get from Environment Variable (process.env.ENV_VARIABLE)
        handshake: true
    }));

    chatSocket.on('connection', function (client) {
        client.name = client.decoded_token.username;
        client.id = client.decoded_token._id;
        console.log('client connected to \'/chat\'' + client.name );
        client.on('disconnect', function(){
            console.log('client disconnected from \'/chat\'' + client.name );
        });
    });
}

// The lobby namespace, where all clients were connected if they join a lobby.
function nspLobby() {
    lobbySocket.use(socketioJwt.authorize({
        secret: "MY_SECRET",    //TODO get from Environment Variable (process.env.ENV_VARIABLE)
        handshake: true
    }));

    lobbySocket.on('connection', function (client) {
        client.name = client.decoded_token.username;
        console.log('client connected to \'/lobby\' ' + client.name );
        client.on('disconnect', function(){
            console.log('client disconnected from \'/lobby\' ' + client.name );
        });
    });
}

// Removes a client from a specific namespace.
io.prototype.removeClientFromNamespace = function(id, namespace){
    var ns = io.of(namespace || "/");

    if (ns) {
        var index = ns.connected.indexOf(id);
        if(index !== -1){
            ns.connected[index].disconnect();
        }
    }
}

// Returns a specific namespace from the io-object.
io.prototype.getNamespace = function(namespace){
    return socket.of(namespace || "/");
}

// Search and returns a specific client from a namespace and or room.
io.prototype.getClient = function(id, namespace, roomId) {
    var res = [];
    var ns = io.of(namespace || "/");

    if (ns) {
        var index = ns.connected.indexOf(id);
        if(index !== -1){
            if(roomId){
                var indexRoom = ns.connected[index].rooms.indexOf(roomId);
                if(indexRoom !== -1){
                    return ns.connected[index];
                }
            }else{
                return ns.connected[index];
            }
        }
    }
    return null;
}
