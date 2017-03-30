const socketio      = require('socket.io');
const socketioJwt   = require("socketio-jwt");

var standardClients = [],
    lobbyClients    = [];

var socket      = null,
    lobbySocket = null,
    chatSocket  = null;

module.exports = io;

function io(server){
    socket = socketio.listen(server);
    chatSocket = socket.of('/chat');
    lobbySocket = socket.of('/lobby');
    nspChat();
    nspLobby();
};

function nspChat(){
    chatSocket.use(socketioJwt.authorize({
        secret: "MY_SECRET",    //TODO get from Environment Variable (process.env.ENV_VARIABLE)
        handshake: true
    }));

    chatSocket.on('connection', function (client) {
        client.name = client.decoded_token.username;
        client.id = client.decoded_token._id;
        console.log('client connected ' + client.name );
        standardClients.push(client);
        client.on('disconnect', function(){
            console.log('client disconnected ' + client.name );
            var index = standardClients.indexOf(client.name);
            if(index != -1) standardClients.splice(index, 1);
        });
    });
}

function nspLobby() {
    lobbySocket.use(socketioJwt.authorize({
        secret: "MY_SECRET",    //TODO get from Environment Variable (process.env.ENV_VARIABLE)
        handshake: true
    }));

    lobbySocket.on('connection', function (client) {
        client.name = client.decoded_token.username;
        console.log('client connected to \'lobby\' ' + client.name );
        lobbyClients.push(client);
        client.on('disconnect', function(){
            console.log('client disconnected from \'lobby\' ' + client.name );
            var index = lobbyClients.indexOf(client.name);
            if(index != -1) lobbyClients.splice(index, 1);
        });
    });
}

io.prototype.getNamespace = function(namespace){
    return socket.of(namespace);
}

io.prototype.getClient = function(name, namespace) {
    var index;
    if(namespace == '/lobby'){
        index = lobbyClients.indexOf(name);
        if(index >= 0) return lobbyClients[index];
    }
    else{
        index = standardClients.indexOf(name);
        if(index >= 0) return standardClients[index];
    }
    return null;
}
