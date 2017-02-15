const socketio = require('socket.io');
const UUID = require('UUID');

module.exports.invoke = function(server) {
    var io = socketio.listen(server);

    io.sockets.on('connection', function onConnection(client){
        client.userid = UUID();
        client.emit("connected", { id: client.userid } );
        console.log('player ' + client.userid + ' connected ');

        client.on("disconnect", function(){
            console.log('client disconnected ' + client.userid );
        });
    });
};
