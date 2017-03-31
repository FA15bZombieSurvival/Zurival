var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    http = require('http');
    compress = require('compression'),
    Lobby = require('./game/lobby.js'),
    Player = require('./game/entities/player.js');

var app = express()
    passport = require('./modules/passport.js');

app.set('port', process.env.PORT || 3000);
app.use(compress())
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
// maxAge for caching in server (default: 86400000)
app.use(express.static(path.join(__dirname, '/public/game'), { maxAge: 0 }));

var server = http.createServer(app);

//Array for all Lobbys
var lobbys = [];

// Any socket.io related functions are at game/helper/io.js
var io = require('./game/helper/io.js').invoke(server);

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

var routes = require('./modules/routes.js')(app, lobbys, function(err, data){
    if(err){ console.log("Err: " + err); }
    //Switch to distinguish different callbacks
    switch(data.name){
        case 'createdLobby':
            var alreadyUsed = false
            for(var i=0; i<lobbys.length; i++){
                if(lobbys[i].name == data.lobbyname){
                    alreadyUsed = true;
                }
            }
            if(!alreadyUsed){
                let lobby = new Lobby(data.lobbyname, data.user);
                lobbys.push(lobby);
            }
            break;
        case 'joinLobby':
            var alreadyJoined = false;
            // Find lobby
            for(var i=0; i<lobbys.length; i++){
                if(lobbys[i].name == data.lobby.name){
                    // Check if player has already joined
                    for (var j = 0; j < lobbys[i].players.length; j++) {
                        if(lobbys[i].players[j].id === data.user.id){
                            alreadyJoined = true;
                        }
                    }
                    if(!alreadyJoined){
                        lobbys[i].addPlayer(data.user);
                    }
                }
            }
            data.callback();
            break;
        default: break;
    }
});

mongoose.connect('mongodb://localhost:27017/zurival');
