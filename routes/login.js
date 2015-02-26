var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) { 
    res.setHeader("Content-Type","application/json");
    if(err) return next(err);
    if(!user) {
      res.send({
        success: false,
        info: info
      });
      return true;
    } else {
      res.redirect('/users' + user.name);
      return true;
    }
  })(req, res, next);
});

module.exports = router;
