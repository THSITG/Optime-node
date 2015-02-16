var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	req.logout();
  	res.redirect('/');
});

module.exports = router;
