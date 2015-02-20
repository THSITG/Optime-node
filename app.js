var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var path = require('path');
var fs = require('fs');

var lessMW = require('less-middleware');
var coffeeMW = require('connect-coffee-script');

var app = express();
var config = require('./config');

// Setup Database

var mongoConnStr = "mongodb://"

if(config.get("database:username") != null && config.get("database:password") != null) {
  mongoConnStr += config.get("database:username")
  + ":"
  + config.get("database:password")
  + "@";
}

mongoConnStr += config.get("database:host");
if(config.get("database:port")) {
  mongoConnStr += ":" + config.get("database:port");
}
mongoConnStr += "/" + config.get("database:name");

console.log("Database Str: "+mongoConnStr);

var mongoose = require('mongoose');
mongoose.connect(mongoConnStr);

var Task = require('./schemas/task');
var User = require('./schemas/user');
var Board = require('./schemas/board');

// passport local strategy config

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, inputPassword, done) {
    var query=User.findOne({ email: email });
    query.select('name email boards password');
    query.exec(function(err,user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      } if (user.validatePassword(inputPassword)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  }
));

// routes requirment

var index = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');
var login = require('./routes/login');
var logout = require('./routes/logout');
var bowers = require('./routes/bowers');

users.use(function (req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(lessMW(path.join(__dirname, 'assets'),{
  dest: path.join(__dirname,'public')
}));
app.use(coffeeMW({
  src: path.join(__dirname,'assets'),
  dest: path.join(__dirname,'public'),
  compress: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/bower', bowers);

// routes config

app.use('/', index);
app.use('/users', users);
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Test data
(function() {
  var uname="CircuitCoder";
  var email="circuitcoder0@gmail.com";
  var passwd="iampassword";
  new User({
    name: uname,
    email: email,
    password: User.hashPassword(email,passwd),
    boards: []
  }).save(function(err,user) {
    if (err) console.error(err);
    console.log(user);
  });
})();

module.exports = app;
