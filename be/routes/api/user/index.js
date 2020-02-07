var express = require('express');
var router = express.Router();
var createError = require('http-errors')
/* GET home page. */
const us = [
  {
    name : '김하늘',
    age : 21
  },
  {
    name : '이하늘',
    age : 22
  }
]

//get과 delete의 req는 조금 다름
//put과 delete는 유니크한 아이디 필요
//post는 딱히 필요 x
//get은 모든 리스트와, 특정 정보 두가지 경우
router.get('/', function(req, res, next) { //read
  res.send( { users: us, msg: 'get'});
});

router.post('/', (req, res, next) => { //create
  res.send({ success: true, msg: 'post' })
  console.log(req.body) // post, put는 바디에
});

router.put('/', (req, res, next) => { //update
  res.send({ success: true, msg: 'put' })
  console.log(req.body) // post, put는 바디에
}) 

router.delete('/', (req, res, next) => { //delete
  res.send({ success: true, msg: 'delete' })
}) 


router.all('*', function(req, res, next) {
  next(createError(404,'[WARNING] there is no api in user!'));
});

module.exports = router;
