const socketio  = require('socket.io');
const UUID      = require('uuid/v4');

var client  = NULL,
    room;

module.exports.invoke = function(server) {
    var io = socketio.listen(server);
    var ioLobby = io.of('/lobby');

    ioLobby.use(socketioJwt.authorize({
        secret: "MY_SECRET",    //ToDo get from Environment Variable (process.env.ENV_VARIABLE)
        handshake: true
    }));

    ioLobby.on('connection', function (client) {
        this.client = client;
        this.client.name = client.decoded_token.username);
        this.client.on('disconnect', function(){
            console.log('client disconnected ' + this.client.userid );
            client = NULL;
        });
    });

    return io;
};

/*
module.exports.setRoom = function(roomName) {
    room = roomName;
    if(client !== NULL){
        client.join(room);
        client.emit('connected', { id: client.userid } );
        console.log('player ' + client.userid + ' connected ');
    }
}

module.exports.sendOwnPosition = function(data) {
    if(client !== NULL){
        client.emit("position", data);
    }
}
*/
