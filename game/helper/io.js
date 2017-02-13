module.exports = (function(app, io) {

    var gameData = {
        io: io,
        players: [],
        maps: {}
    };

    gameData.io.sockets.on('connection', function onConnection(client){
        client.userid = UUID();
        client.emit("connected", { id: client.userid } );
        console.log('player ' + client.userid + ' connected ');

        client.on("disconnect", function(){
            console.log('client disconnected ' + client.userid );
        });
    });
});
