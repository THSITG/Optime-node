var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err,user,info) { 
    if(err) return next(err);
    if(!user) {
      res.write(JSON.stringify({
        success: false,
        info: info
      }));
      res.send();
      return true;
    } else {
      res.write(JSON.stringify({
        success: true,
        user: {
          name: user.name,
          email: user.email,
          boards: user.boards
        }
      }));
      res.send();
      return true;
    }
  })(req,res,next);
});

module.exports = router;
