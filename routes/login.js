var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});

router.post('/', function(req, res, next) {
		passport.authenticate('local', { 
  			successRedirect: '/users' + req.user.email,
  			failureRedirect: '/login'
  	});
});

module.exports = router;
