var express = require('express');
var router = express.Router();
var createError = require('http-errors')

router.get('/', function(req, res, next) {
  console.log(req.headers)
  res.send(
    {
      msg : 'it is okey'
    }
  );
});

router.get('/userAuth', function(req, res, next) {
  res.send('what?');
});

router.all('*', function(req, res, next) {
  next(createError(404,'[WARNING] there is no api in test!'));
});

module.exports = router;
