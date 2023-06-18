const router = require('express').Router()
const Controller = require('./controller')

router.post('/', Controller.addPlace)

module.exports = router
