var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  passport.authenticate('local', function(err,user,info) { 
    console.log(err);
    if(err) return next(err);
    if(!user) {
      res.write(info);
      return next(req,res);
    } else {
      res.write("Complete");
      return next(req,res);
    }
  })(req,res,next);
});

module.exports = router;
