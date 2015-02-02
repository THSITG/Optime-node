var express = require('express');
var path = require('path');
var router = express.Router();

router.use(
    "/core-icons/demo.html",
    express.static(path.join(__dirname,'..','assets','html','demo.html'))
);
router.use(
    "/font-roboto/roboto.html",
    express.static(path.join(__dirname,'..','assets','html','roboto.html'))
);
router.use(
    "/core-doc-viewer/elements/core-doc-page.html",
    express.static(path.join(__dirname,'..','assets','html','core-doc-page.html'))
);

router.use('/',express.static(path.join(__dirname,'..','bower_components')));

module.exports = router;
