const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID, /* add your client ID here */
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'  /* add your client secret here */
    }, function (accessToken, refreshToken, profile, done) {
        User.findOne({ googleId: profile.id }).then(function (currUser) {
            if (currUser) {
                console.log('User is' + currUser)
                done(null, currUser);
            }
            else {
                var user = new User({
                    username: profile.name.givenName,
                    googleId: profile.id
                })
                user.save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        })
    })
);
