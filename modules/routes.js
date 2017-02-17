var async = require('async'),
    request = require('request'),
    xml2js = require('xml2js'),
    _ = require('lodash'),
    Map = require('../models/map.js'),
    passport = require('./passport.js');

module.exports = function(app, worlds, callback){

    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.send(500, { message: err.message });
    });

    app.get('/api/logout', function(req, res, next) {
        req.logout();
        res.send(200);
    });

    app.use(function(req, res, next) {
        if (req.user) {
            res.cookie('user', JSON.stringify(req.user));
        }
        next();
    });

    app.get('/game/lobby', function(req, res){
        res.json({ worlds: worlds });
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

    app.post('/api/generateWorld', function(req, res){
        var id = req.body._id;
        Map.findById(id, function(err, map){
            if(err){ return res.status(401).send(err + '\nErr:CantCreateWorld') }
            if(map){
                //null for possible error responses
                callback(null, {
                    name: "generatedWorld",
                    value: map
                });
                res.status(200).send(map);
            }
            else {
                res.status(401).send("Couldn\'t find a map");
            }
        });
    });
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) next();
    else res.sendStatus(401);
}
