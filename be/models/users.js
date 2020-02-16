const mongoose = require('mongoose');
const cfg = require('../../config/inedx')

mongoose.set('useCreateIndex', true)
const userSchema = new mongoose.Schema({
  name: {type: String, default: '', index: true},
  age: {type: Number, default: 1},
  id: {type: String, default: '', unique:  true, index: true},
  pwd: {type: String, default: ''},
  retry: {type: Number, default: 0},
  inCnt: {type: Number, default: 0}, //로그인 횟수
  lv: {type:Number, default: 2} //사용자 권한 lv
  // 0: admin, 1: super user, 2: common user, 3: guest
})


const User = mongoose.model('User', userSchema);
// User.collection.dropIndexes({name : 1})


//admin 계정 초기 세팅
User.findOne({id: cfg.admin.id}).then((r) => {
  if(!r) return User.create({id : cfg.admin.id, pwd: cfg.admin.pwd, name: cfg.admin.name})
  if(r.lv === undefined) return User.updateOne({_id: r.id}, {
    $set: {
      lv: 0,
      inCnt: 0
    }
  })
  return Promise.resolve(null)
}).then((r) => {
  if(r) console.log(`admin: ${r.id} created!`)
}).catch((e) => {
  console.error(e.message)
})

module.exports = User;