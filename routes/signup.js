var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var crypto = require('crypto');
var md5 = crypto.createHash('md5');
var salt = "whyimsohandsome";
var confirm;
var User = require('../schemas/user');

router.post('/', function(req, res, next) {

	token = req.body.password + req.body.email + salt;
	md5.update(token);
	var password = md5.digest('base64');
	crypto.randomBytes(32, function(err, buf) {
		if(err) throw err;
		confirm = buf.toString('base64');
	});

	var user = new User({
		name: req.body.email,
		email: req.body.email,
		password: password,
		active: false,
		confirm: confirm	
	});

	user.save(function (err, user) {
		if (err) console.error(err);
		console.log(user);
	});
		
	var transporter = nodemailer.createTransport({
		host: 'smtp.op-ti.me',
		port: 25,
		auth: {
			user: 'admin@op-ti.me',
			pass: 'hehehe123'
			}
	});
		
	var mailOptions = {
		from: 'Optime <admin@op-ti.me>',
		to: req.body.email,
		subject: 'Welcome to Optime',
		html: '<p>click the link to confirm your email: <a>https://op-ti.me/signup/confirm?code=' + confirm;
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
		}else{
			console.log('Message sent: ' + info.response);
		}
	});
});

router.post('/confirm', function(req, res, next) {
	code = req.query.code;
	var query = User.findOne({confirm: code});
	query.select('name email active');
	query.exec(function(err, user) {
		if(err) return done(err);
		if (!user) {
			return done(null, false, { message: 'Activation failed' });
		}
		else {
			user.active = true;
			return done(null, false, { message: 'Activation Success' });
		}
	});
});

module.exports = router;
