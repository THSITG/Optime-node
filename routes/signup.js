var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var crypto = require('crypto');
var salt = "whyimsohandsome";
var confirm;
var User = require('../schemas/user');

router.post('/', function(req, res, next) {
  token = req.body.password + req.body.email + salt;
  var md5 = crypto.createHash('md5');
  md5.update(token);
  var password = md5.digest('base64');

  var buf = crypto.randomBytes(32);
  var confirm = buf.toString('base64');

  var user = new User({
    name: req.body.username,
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
    tls: {
      rejectUnauthorized:false
    },
    auth: {
      user: 'admin@op-ti.me',
      pass: 'hehehe123'
    }
  });
  console.log(confirm);

  var mailOptions = {
    from: 'Optime <admin@op-ti.me>',
    to: req.body.email,
    subject: 'Welcome to Optime',
    html: '<p>click <a href="https://op-ti.me/signup/confirm?code=' + confirm + '">here</a> to confirm your email</p>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.send({
        success: false,
        message: "Cannot send the email"
      });
    }else{
      console.log('Message sent: ' + info.response);
      res.send({
        success: true,
        target: req.body.email
      });
    }
  });
});

router.get('/confirm', function(req, res, next) {
  code = req.query.code;
  var query = User.findOne({confirm: code});
  query.select('name email active');
  query.exec(function(err, user) {
    if(err) console.console.log(err);
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
