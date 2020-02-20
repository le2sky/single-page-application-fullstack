var express = require('express')
var createError = require('http-errors')
var router = express.Router();
var User = require('../../../models/users')

router.post('/', (req,res) => {
    const u = req.body
    if (!u.id) return res.send({ success: false, msg: '아이디를 입력해주세요!'})
    if (!u.pwd) return res.send({ success: false, msg: '비밀번호를 입력해주세요!'})
    if (!u.name) return res.send({ success: false, msg: '이름을 입력해주세요!'})
    
    User.findOne({id: u.id}).then((r) => {
        if(r) throw new Error('이미 등록되어 있는 아이디입니다.')
        return User.create(u)
    }).then((r) => {
        res.send({success: true})
    }).catch((e) => {
        res.send({success: false, msg: e.message })
    })
})

router.all('*', (req, res, next) => {
    next(createError(404, 'there is no api in register'))
});

module.exports = router