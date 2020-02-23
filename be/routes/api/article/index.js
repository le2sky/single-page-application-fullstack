const express =  require('express')
const createError = require('http-errors')
const router = express.Router()
const Board = require('../../../models/boards')
const Article = require('../../../models/articles')

router.post('/:_board', (req, res, next) => {
    console.log(`${req.user._id}가 게시물 작성을 요청함`)
    const _board = req.params._board
    if(!_board) return res.send({ success: false, msg: '게시판을 지정해주세요!'})
    const { title, content } = req.body

    Board.findOne({ _id: _board }).then((r) => {
        // if (r.lv < req.lv) return res.send({ success: false, msg: `${name} 게시판을 볼 수 있는 자격이 없습니다.`})
        if(!r) throw new Error('게시판 없음')
        if(r.lv < req.user.lv) throw new Error('권한이 없습니다.')

        const atc = {
            title,
            content,
            _board,
            ip: req.ip,
            _user: null
        }
        if (req.user._id) atc._user = req.user._id
        return Article.create(atc)
    }).then((r) => {
        res.send( { success: true, d: r, token : req.token })
    })
    .catch((e)=>{
        res.send({ success: false, msg: e.message })
    })
})

router.get('/:_board', (req, res, next) => {
    const _board = req.params._board
    Article.find( { _board } ).populate('_user', '-pwd').then((rs) => {
        res.send( { success: true, ds: rs, token : req.token })
    }).catch((e) => {
        res.send({ success: false, msg: e.message })
    })
})

router.put('/:_id', (req, res, next)=>{
    if (!req.user._id) return res.send({success: false, msg: '손님은 수정 권한이 없습니다.'})
    const _id = req.params._id

    Article.findById(_id).then((r) => {
        if(!r) throw Error('게시물 없음')
        if(r._user.toString() !== req.user._id ) throw Error('다른 사람의 게시글을 수정할 수 없습니다.')
        return Article.findOneAndUpdate({ _id }, { $set : req.body }, {new : true})
    }).then((r) => {
        res.send({ success: true, d: r, token: req.token})
    }).catch((e) => {
        res.send({success: false, msg: e.message})
    })
})

router.delete('/:_id', (req, res, next) => {
    if (!req.user._id) return res.send({success: false, msg: '손님은 수정 권한이 없습니다.'})
    const _id = req.params._id
    
    Article.findById(_id).populate('_user', 'lv' ).then((r) => {
        if(!r) throw Error('게시물 없음')
        if(r._user) {
            if(r._user._id.toString() !== req.user._id ){
                if(r._user.lv < req.user.lv) throw new Error('삭제 권한이 없습니다.')
                throw Error('다른 사람의 게시글을 수정할 수 없습니다.')
            }   
        }
        return Article.deleteOne({ _id })
    }).then((r) => {
        res.send({ success: true, token : req.token})
    }).catch((e) =>{
        res.send({ success: false, msg: e.message})
    })

})
router.all('*', (req, res, next) => {
    next(createError(404, 'there is no api in board'))
})

module.exports = router