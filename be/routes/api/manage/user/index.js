var express = require('express');
var router = express.Router();
var createError = require('http-errors')
const User = require('../../../../models/users')

//get과 delete의 req는 조금 다름
//put과 delete는 유니크한 아이디 필요
//post는 딱히 필요 x
//get은 모든 리스트와, 특정 정보 두가지 경우

// 20200216 50 -> 회원가입 구현 위해서 post 요청 deprecated
// router.post('/', (req, res, next) => { //create
//   const { name , age } = req.body;
//   const u = new User({name,age});
//   u.save().then((r) => {
//     res.send({success : true, msg : r})
//   }).catch((e) => {
//     res.send({success : false, msg : e.message})
//   })
// });


router.get('/', function(req, res, next) { //read
  User.find().then((r) => {
    res.send( { users: r, success : true});
  }).catch((e) =>{ 
    res.send({ success : false});
  })
});



router.put('/:_id', (req, res, next) => { //update
  const _id = req.params._id
  User.updateOne({_id},{
    $set: { $set:req.body }
  }).then((r) => {
    res.send({success : true, msg : r})
  }).catch((e) => {
    res.send({success : false, msg : e.message})
  })
  // console.log(req.body) // post, put는 바디에
}) 

router.delete('/:_id', (req, res, next) => { //delete
  const _id = req.params._id
  User.deleteOne({_id}).then((r) => {
    res.send({success : true, msg : r})
  }).catch((e) => {
    res.send({success : false, msg : e.message})
  })
}) 


router.all('*', function(req, res, next) {
  next(createError(404,'[WARNING] there is no api in user!'));
});

module.exports = router;
