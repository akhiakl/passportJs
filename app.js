const express = require('express');
const authRoutes = require('./routes/auth-routes');
const mongoose = require('mongoose');
var session = require('express-session');
const passport = require('passport');
// connect to mongodb
mongoose.connect('mongodb://localhost/mydb', () => {
    console.log('connected to mongodb');
});

const app = express();

app.use(session({
    secret: 'mysecretkey',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

// set view engine
app.set('view engine', 'ejs');

// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', function(req, res) {
    res.render('home');
});

app.listen(3000, function() {
    console.log('app now listening for requests on port 3000');
});
