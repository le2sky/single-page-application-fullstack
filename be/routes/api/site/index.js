var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Site = require('../../../models/sites')

router.get('/', function(req, res, next) {  
  Site.findOne({})
    .then((r) => {
      res.send({ success: true, d: r, token: req.token})
    })
    .catch((e) => {
      res.send({ success: false, msg: e.message })
    })
});

router.all('*', function(req, res, next) {
  next(createError(404, 'there is no api in site'));
});

module.exports = router;