const router = require('express').Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup')
// auth login
router.get('/login', function(req, res) {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', function(req, res) {
    // handle with passport
    res.send('logging out');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), function(req, res) {
    res.send(req.user);
});

module.exports = router;
