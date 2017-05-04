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
    //World = require('./game/world.js'),
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

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

var mainRoutines = require('./modules/mainroutines.js')(server);

var routes = require('./modules/routes.js')(app, mainRoutines);

mongoose.connect('mongodb://localhost:27017/zurival');
