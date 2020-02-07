var express = require('express');
var router = express.Router();
var createError = require('http-errors')
/* GET home page. */
router.get('/hello', function(req, res, next) {
  res.send(
    {
      a : 1,
      msg : 'hello! it is my first api!'
    }
  );
});


router.use('/test', require('./test'));
router.use('/user', require('./user'));

router.all('*', function(req, res, next) {
  next(createError(404,'[WARNING] there is no api!'));
});

module.exports = router;
