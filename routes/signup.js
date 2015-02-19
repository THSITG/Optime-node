var express = require('express');
var router = express.Router();

var crypto = require('crypto');
var md5 = crypto.createHash('md5');
var salt = "whyimsohandsome";

var User = require('../schemas/user');

router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign Up' });
});

router.post('/', function(req, res, next) {

	token = req.body.password + req.body.email + salt;
	md5.update(token);
	var password = md5.digest('base64');

	var user = new User({
		name: req.body.email,
		email: req.body.email,
		password: password
	});

	user.save(function (err, user) {
		if (err) console.error(err);
		console.log(user);
	})
});

module.exports = router;
