var express = require('express');
var router = express.Router();
var createError = require('http-errors')
const Page = require('../../../../models/pages')

router.get('/', function(req, res, next) { //read
  Page.find().then((r) => {
    res.send( { users: r, success : true});
  }).catch((e) =>{ 
    res.send({ success : false});
  })
});

router.put('/:_id', (req, res, next) => { //update
  const _id = req.params._id
  Page.updateOne({_id},{
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
  Page.deleteOne({_id}).then((r) => {
    res.send({success : true, msg : r})
  }).catch((e) => {
    res.send({success : false, msg : e.message})
  })
}) 


router.all('*', function(req, res, next) {
  next(createError(404,'[WARNING] there is no api in page!'));
});

module.exports = router;