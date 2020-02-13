var express = require('express');
var router = express.Router();
var createError = require('http-errors')


//로그인을 할때는 토큰 검사가 필요없음.
router.use('/sign', require('./sign'));

router.all('*', (req,res,next) => {
  //미들웨어 작성 부분 -> 토큰 구현
  next();
})

router.use('/test', require('./test'));
router.use('/user', require('./user'));



router.all('*', function(req, res, next) {
  next(createError(404,'[WARNING] there is no api!'));
});

module.exports = router;
