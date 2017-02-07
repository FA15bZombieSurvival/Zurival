var async = require('async'),
    request = require('request'),
    xml2js = require('xml2js'),
    _ = require('lodash'),
    passport = require('./passport.js'),
    agenda = require('./agenda.js'),
    Show = require('../models/show.js');

module.exports = function(app){

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
                return res.send(user);
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
            if (err) return next(err);
            res.sendStatus(200);
        });
    });
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) next();
    else res.sendStatus(401);
}
