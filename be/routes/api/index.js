var express = require('express');
var router = express.Router();
var createError = require('http-errors')

const jwt = require('jsonwebtoken')
const cfg = require('../../../config/index')
const moment = require('moment')
//로그인을 할때는 토큰 검사가 필요없음.
router.use('/sign', require('./sign'));
router.use('/register', require('./register'))


const signToken = (_id, id, lv, name, exp) => {
  return new Promise((resolve, reject) => {
    const o = {
      issuer: cfg.jwt.issuer,
      subject: cfg.jwt.subject,
      expiresIn: exp,
      algorithm: cfg.jwt.algorithm
    }
    //if (rmb) o.expiresIn = cfg.jwt.expiresInRemember // 7일
    jwt.sign({_id, id, lv, name}, cfg.jwt.secretKey, o, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

const getToken = async(t) => {
  let vt = await verifyToken(t)
  if (vt.lv > 2) return { user: vt, token: null }
  const diff = moment(vt.exp * 1000).diff(moment(), 'seconds')
  // return vt
  console.log(diff)
  const expSec = (vt.exp - vt.iat)
  if (diff > expSec / cfg.jwt.expiresInDiv) return { user: vt, token: null }

  const nt = await signToken(vt._id, vt.id, vt.lv, vt.name, expSec)
  vt = await verifyToken(nt)
  return { user: vt, token: nt }
}

const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    if (!t) resolve({ id : 'guest', name: '손님', lv: 3})
    if((typeof t) !== 'string') reject(new Error('문자가 아닌 토큰 입니다.'))
    if(t.length < 30) resolve({ id : 'guest', name: '손님', lv: 3})
    jwt.verify(t, cfg.jwt.secretKey, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
}

router.all('*', function(req, res, next) {
  // 토큰 검사
  getToken(req.headers.authorization).then((v) => {
    console.log(v)
    req.user = v.user
    req.token = v.token
    next()
  }).catch((e) => {
    res.send({success: false, msg: e.message})
  })
});


router.use('/test', require('./test'));
router.use('/page', require('./page'));
router.use('/manage', require('./manage'));
router.use('/site', require('./site'));
router.use('/board', require('./board'));
router.use('/article', require('./article'));

router.all('/', (req, res, next) => {
  next(createError(404, 'there is no api'))
})

module.exports = router;
