var express = require('express');
var router = express.Router();
var createError = require('http-errors')

const jwt = require('jsonwebtoken')
const cfg = require('../../../config/inedx')

//로그인을 할때는 토큰 검사가 필요없음.
router.use('/sign', require('./sign'));



const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    if (!t) resolve({ id : 'guest', name: '손님', lv: 3})
    if((typeof t) !== 'string') reject(new Error('문자가 아닌 토큰 입니다.'))
    if(t.length < 30) resolve({ id : 'guest', name: '손님', lv: 3})
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
      //console.log(v)
      req.user = v
      next()
    }).catch((e) => {
      res.send({ success: false, msg: e.message })
    })  
});


router.use('/test', require('./test'));
router.use('/page', require('./page'));
router.use('/manage', require('./manage'));


router.all('/', (req, res, next) => {
  next(createError(404, 'there is no api'))
})

module.exports = router;
