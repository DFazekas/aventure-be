const router = require('express').Router()
const Controller = require('./controller')

router.post('/', Controller.createTrip)
router.get('/', Controller.getTrips)

module.exports = router
