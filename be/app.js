var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const history = require('connect-history-api-fallback');
const cors = require('cors');
const cfg = require('../config/inedx');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if(process.env.NODE_ENV !== 'production') app.use(cors())
app.use('/api', require('./routes/api'));
app.use(history());
app.use(express.static(path.join(__dirname,'../','fe', 'dist')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    msg : err.message
  })
});

module.exports = app;

const mongoose = require('mongoose');
// const User = require('./models/users');


console.log(cfg.dbUrl)
mongoose.connect(cfg.dbUrl, {useNewUrlParser : true, useUnifiedTopology: true},(err) => {
  if(err) return console.error(err);
  console.log('mongoose connected')

  // ---------create-------------
  // User.create({name : "leesky"}).then((r) => {
  //   console.log(r);
  // }).catch((e) => {
  //   console.error(e)
  // }) 
  
  //---------read---------------
  // User.find().then((r) => {
  //     console.log("test: ",r);
  // }).catch((e) => {
  //   console.error(e)
  // })

  //--------update---------------
  // User.updateOne({
  //   _id: '5e3d2ec959f9495cdc78ef99'
  // },{
  //   $set: {
  //     age: 22
  //   }
  // }).then((r) => { //promise에 대한 공부
  //   console.log('test: ',r);
  //   console.log('updated')
  //   return User.find()
  // }).then((r) => {
  //   console.log(r)
  // }).catch((e) => {
  //   console.error(e)
  // })

  //--------delete-----------------
  // User.deleteOne({
  //   name : 'leesky'
  // }).then((r)=>{
  //   console.log(r)
  //   return User.find()
  // }).then((r) => {
  //   console.log(r)
  // }).catch((e)=>{
  //   console.error(e)
  // })

  // User.deleteMany().then((r)=>{
  //   console.log(r)
  // }).catch((e)=>{
  //   console.error(e)
  // })
})
console.log(`[NOTICE] ${process.env.NODE_ENV} 모드로 서버가 실행되었습니다.`)


// const crypto = require('crypto');
// // Using the factory defaults.
// const key1 = crypto.scryptSync('secret', 'salt', 64);
// console.log(key1.toString('hex'));  // '3745e48...08d59ae'
// // Using a custom N parameter. Must be a power of two.
// const key2 = crypto.scryptSync('secret', 'salt', 64, { N: 1024 });
// console.log(key2.toString('hex'));  // '3745e48...aa39b34'