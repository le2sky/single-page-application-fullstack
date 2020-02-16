var express = require('express')
var createError = require('http-errors')
var router = express.Router()

router.use('/user', require('./user'))
router.use('/page', require('./page'))

router.all('/', (req, res, next) => {
    next(createError(404, 'there is no api in manage api'))
})

module.exports = router