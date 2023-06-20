const router = require('express').Router()
const Controller = require('./controller')

router.post('/', Controller.createTrip)

module.exports = router
