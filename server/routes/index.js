var express = require('express');
var router = express.Router();
var db = require('../javascripts/models.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/api/update', function (req, res, next) {
  db.updateAppState(JSON.parse(req.body.data))
  .then(function (result) {
    console.log('**************', result);
    res.send({body: result})
  })
});

router.post('/api/initial', function (req, res, next) {
  db.createORreturn(JSON.parse(req.body.data))
  .then(function (result) {
    console.log(result);
    res.send({body: result});
  })
});

module.exports = router;
