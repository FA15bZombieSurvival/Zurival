var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

User = require('../models/user.js');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('login', new LocalStrategy({ passReqToCallback : true }, function(req, email, password, done) {
    User.findOne({ email: email }, function(err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, "User not found");
        user.comparePassword(password, function(err, isMatch) {
            if (err) return done(err);
            if (isMatch) return done(null, user);
            return done(null, false, "Wrong Password");
        });
    });
}));

module.exports = passport;
