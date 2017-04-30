var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

User = require('../models/user.js');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('login', new LocalStrategy({ passReqToCallback : true }, function(req, email, password, done) {
    User.findOne({ email: email }, function(err, user) {
        if (err) return done(err);
        if (user){
            user.comparePassword(password, function(err, isMatch) {
                if (err) return done(err);
                if (isMatch) return done(null, user);
                return done(null, false, "Err:Password");
            });
        }else{
            User.findOne({ username: email }, function(err, user) {
                if (err) return done(err);
                if (!user) return done(null, false, "Err:User");
                user.comparePassword(password, function(err, isMatch) {
                    if (err) return done(err);
                    if (isMatch) return done(null, user);
                    return done(null, false, "Err:Password");
                });
            });
        }
    });
}));

module.exports = passport;
