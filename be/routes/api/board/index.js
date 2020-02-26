const express =  require('express')
const createError = require('http-errors')
const router = express.Router()
const Board = require('../../../models/boards')

router.get('/read/:name', (req, res, next) => {
    const name = req.params.name
    Board.findOne({ name }).then((r) => {
        // if (r.lv < req.lv) return res.send({ success: false, msg: `${name} 게시판을 볼 수 있는 자격이 없습니다.`})
        res.send( { success: true, d: r, token : req.token })
    }).catch((e)=>{
        res.send({ success: false, msg: e.message })
    })
})

router.get('/list', (req, res, next) => {
    Board.find().sort({lv: -1}).then((rs) => {
        res.send({success: true, ds: rs, token: req.token})
    }).catch((e) => {
        res.send({success: false, msg: e.message})
    })
})


router.all('*', (req, res, next) => {
    next(createError(404, 'there is no api in board'))
})

module.exports = router