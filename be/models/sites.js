const mongoose = require('mongoose')

const siteSchema = new mongoose.Schema({
    title : {type: String, default: '등록 필요'},
    copyright: {type: String, default:'등록 필요'},
    dark: {type: Boolean, default: true}
})

const Site = mongoose.model('Site', siteSchema)

Site.findOne().then((r) => {
    if(!r) return Site.create({title: '등록 필요함'})
    return Promise.resolve(r)
}).then((r) => {
    if(r) console.log(`[notice] web application ${r.title}이 시작되었습니다.`)
}).catch((e)=>{
    console.error(e.message)
})


module.exports = Site