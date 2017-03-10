const socketio = require('socket.io');
const UUID = require('uuid/v4');

module.exports.invoke = function(server) {
    var io = socketio.listen(server);

    // Player connects into the game
    io.sockets.on('connection', function onConnection(client){
        client.userid = UUID();
        client.emit("connected", { id: client.userid } );
        console.log('player ' + client.userid + ' connected ');

        client.on("disconnect", function(){
            console.log('client disconnected ' + client.userid );
        });
        //Saves actions into variables on server
        client.on('playerAction',function(actions) {
           var moveDirection = actions.moveDirection;
           var attack = actions.attack;
           console.log(moveDirection + attack);
        });
    });
};
