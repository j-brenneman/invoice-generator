var express = require('express');
var router = express.Router();
var a = require('../javascripts/models.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  a();
  res.render('index');
});

module.exports = router;
