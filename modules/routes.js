        var async = require('async'),
    request = require('request'),
    xml2js = require('xml2js'),
    _ = require('lodash'),
    Map = require('../models/map.js'),
    Character = require('../models/character.js'),
    passport = require('./passport.js');

module.exports = function(app, lobbys, callback){

    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send({ message: err.message });
    });

    app.get('/api/logout', function(req, res, next) {
        req.logout();
        res.status(200);
    });

    app.use(function(req, res, next) {
        if (req.user) {
            res.cookie('user', JSON.stringify(req.user));
        }
        next();
    });

    // app.get('/api/generateSchema', function(req, res, next){
    //     var Enemy = require('../models/enemy.js');
    //
    //     var enemy1 = new Enemy({
    //         sprite: 21,
    //         name: 'Sprinter1',
    //         description: 'Sprinter are faster than their walkers friends',
    //         hp: 100,
    //         damage: 5,
    //         armor: 1,
    //         type: 'sprinter'
    //     });
    //     var enemy2 = new Enemy({
    //         sprite: 21,
    //         name: 'Sprinter2',
    //         description: 'Sprinter are faster than their walkers friends',
    //         hp: 100,
    //         damage: 5,
    //         armor: 1,
    //         type: 'sprinter'
    //     });
    //     enemy1.save();
    //     enemy2.save();
    //     var map = new Map({
    //         name: 'Wasteland',
    //         maxPlayers: 11,
    //         survivingTime: 22,
    //         enemyTypes: [
    //           enemy1._id,
    //           enemy2._id
    //         ]
    //     });
    //     map.save(function(err){
    //         if(err) console.log(err);
    //     });
    // });

    app.get('/game/lobby', function(req, res){
        res.status(200).send(lobbys);
    });

    app.get('/api/maps', function(req, res) {
        Map
          .find({})
          .populate('enemyTypes')
          .exec(function(err, maps) {
            if(err) console.log(err);
            res.status(200).send(maps);
          })
    });

    app.get('/game/lobby/create_game/:lobbyname', function(req, res){

        var lobbyname = req.params.lobbyname;
        var lobby;

        for (var i = 0; i < lobbys.length; i++) {
            if(lobbys[i].name == lobbyname){
                lobby = lobbys[i];
            }
        }
        if(lobby !== undefined){
            res.status(200).send(lobby);
        }
        else {
            //TODO: Implement callback
            res.redirect('/#' + req.originalUrl);
        }
    });

    app.get('*', function(req, res) {
        res.redirect('/#' + req.originalUrl);
    });

    app.post('/api/login', function(req, res, next) {
        passport.authenticate('login', function(err, user, info){
            if (err) { return next(err); }
            if (!user) {
                res.status(401);
                return res.send(info);
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                res.cookie('user', JSON.stringify(req.user));
                token = user.generateJwt();
                res.status(200);
                res.json({"token": token});
            });
        })(req, res, next);
    });

    app.post('/api/registration', function(req, res, next) {
        var user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        user.save(function(err) {
            if (err){
                if(err.toJSON().errmsg.indexOf("email") >= 0 && err.toJSON().errmsg.indexOf("dup key") >= 0)
                    return next("Err:Email");
                else if(err.toJSON().errmsg.indexOf("username") >= 0 && err.toJSON().errmsg.indexOf("dup key") >= 0)
                    return next("Err:User");
                else
                    return next(err);
            }
            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({"token": token});
        });
    });

    // TODO: Namen auf doppelten Eintrag überprüfen. Die Namen müssen Unique sein.
    app.post('/api/createLobby', function(req, res){

        var lobbyname = req.body.lobbyname;
        var user = req.body.user;

        callback(null, {
            name: 'createdLobby',
            lobbyname: lobbyname,
            user: user
        });

        res.sendStatus(200);
    });

// gibt die ID der ausgesuchten Karte um diese in der Lobby zu erstellen.
    app.post('/api/generateMap', function(req, res){
        var id = req.body._id;
        var lobbyname = req.body.lobbyname;
        Map.findById(id, function(err, map){
            if(err){ return res.status(401).send(err + '\nErr:CantCreateLobby') }
            if(map){
                //null for possible error responses
                callback(null, {
                    name: "generatedMap",
                    lobbyname: lobbyname,
                    value: map
                });
                res.status(200).send(map);
            }
            else {
                res.status(401).send("Couldn\'t find a map");
            }
        });
    });

    app.post('/api/joinLobby', function(req, res){

        var user = req.body.user;
        var lobby = req.body.lobby;
        var ndCallback = function(){
            res.status(200).send(lobby);
        }

        callback(null, {
            name: "joinLobby",
            user: user,
            lobby: lobby,
            callback: ndCallback
        });
    });

    app.post('/api/generatePlayer', function(req, res){
        var character = req.body.character;
        var lobbyID = req.body.lobbyID;

        callback(null, {
            name: "generatedPlayer",
            value: character,
            lobbyID: lobbyID
        });
        res.sendStatus(200);
    });
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) next();
    else res.sendStatus(401);
}
