var express = require('express')
var createError = require('http-errors')
var router = express.Router();


//post 방식의 호출의 두번째 인자는 => body
//get 방식의 호출의 두번째 인자는 => option -> request header 같은거

router.post('/in', (req,res,next) => {
    const {id,pwd} = req.body;
    if (!id) return res.send({
        success: false,
        msg: '아이디를 입력해 주세요'
    });
    if (!pwd) return res.send({
        success: false,
        msg: '비밀번호를 입력해 주세요'
    });
    
    console.log(`${id}님이 접속하셨습니다.`)
    
    res.send({
        success: true,
        token: 'temp token'
    });
});

router.post('./out', (req,res,next) => {
    res.send({
        success: false,
        msg: '아직 준비 안됨'
    });
});

router.all('*', (req,res,next)=>{
    next(createError(404,'[WARNING] there is no api in sign!'))
});

module.exports = router
