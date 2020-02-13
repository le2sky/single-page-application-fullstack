var express = require('express');
var router = express.Router();
var createError = require('http-errors')

router.all('*', (req,res,next) => {
  //미들웨어 작성 부분
  next();
})

router.use('/test', require('./test'));
router.use('/user', require('./user'));

router.all('*', function(req, res, next) {
  next(createError(404,'[WARNING] there is no api!'));
});

module.exports = router;
