var express = require('express');
var router = express.Router();
var createError = require('http-errors')

const jwt = require('jsonwebtoken')
const cfg = require('../../../config/inedx')

//로그인을 할때는 토큰 검사가 필요없음.
router.use('/sign', require('./sign'));

const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    jwt.verify(t, cfg.secretKey, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
}

router.all('*', function(req, res, next) {
  // 토큰 검사
  const token = req.headers.authorization
  verifyToken(token)
    .then(v => {
      console.log(v)
      next()
    })
    .catch(e => res.send({ success: false, msg: e.message }))  
});

router.use('/manage', require('./manage'));
router.use('/test', require('./test'));


router.all('*', function(req, res, next) {
  next(createError(404,'[WARNING] there is no api!'));
});

module.exports = router;
