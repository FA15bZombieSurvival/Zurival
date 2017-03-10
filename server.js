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
    Player = require('./game/entities/Player.js');

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
            let lobby = new Lobby(data);
            lobbys.push(lobby);
        case 'generatedMap':
            for(let lobby in lobbys)
                if(lobby.name === data.lobbyName)
                    lobby.generateWorld(data);
            break;
        case 'generatedPlayer':
            var p = new Player(data.value);
            for(var i=0; i<lobbys.length; i++){
                if(lobbys[i]._id == data.lobbyID){
                    lobbys[i].players.push(p);
                    console.log(lobbys[i].players);
                }
            }
            break;
        default: break;
    }
});

mongoose.connect('mongodb://localhost:27017/zurival');
