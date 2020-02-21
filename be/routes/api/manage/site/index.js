var express = require('express');
var router = express.Router();
var createError = require('http-errors')
const Site = require('../../../../models/sites')

router.get('/', function(req, res, next) { //read
  Site.find().then((r) => {
    res.send( { sites: r, success : true, token: req.token});
  }).catch((e) =>{ 
    res.send({ success : false});
  })
});

router.put('/:_id', (req, res, next) => { //update
  const _id = req.params._id
  Site.updateOne({_id},{
    $set: req.body
  }).then((r) => {
    res.send({success : true, msg : r, token: req.token})
  }).catch((e) => {
    res.send({success : false, msg : e.message})
  })
  // console.log(req.body) // post, put는 바디에
}) 

router.delete('/:_id', (req, res, next) => { //delete
  const _id = req.params._id
  Site.deleteOne({_id}).then((r) => {
    res.send({success : true, msg : r, token: req.token})
  }).catch((e) => {
    res.send({success : false, msg : e.message})
  })
}) 


router.all('*', function(req, res, next) {
  next(createError(404,'[WARNING] there is no api in site!'));
});

module.exports = router;
