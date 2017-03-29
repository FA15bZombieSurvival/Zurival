const socketio      = require('socket.io');
const socketioJwt   = require("socketio-jwt");

var clients     = [];
var socket      = null;

module.exports = io;

function io(server){
    socket = socketio.listen(server);

    socket.use(socketioJwt.authorize({
        secret: "MY_SECRET",    //ToDo get from Environment Variable (process.env.ENV_VARIABLE)
        handshake: true
    }));

    socket.on('connection', function (client) {
        client.name = client.decoded_token.username;
        console.log('client connected ' + client.name );
        clients.push(client);
        client.on('disconnect', function(){
            console.log('client disconnected ' + client.name );
            var index = clients.indexOf(client.name);
            if(index != -1) clients.splice(index, 1);
        });
    });
};

io.prototype.getClient = function(name) {
    var index = clients.indexOf(name);
    if(index != -1) return client;
    else return null;
}
