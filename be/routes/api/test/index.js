var express = require('express');
var router = express.Router();
var createError = require('http-errors')

router.get('/', function(req, res, next) {
  res.send(
    {
      msg : 'it is okey'
    }
  );
});

/* GET home page. */
router.get('/test01', function(req, res, next) {
  res.send(
    {
      msg : 'it is test api'
    }
  );
});

router.all('*', function(req, res, next) {
  next(createError(404,'[WARNING] there is no api in test!'));
});

module.exports = router;
