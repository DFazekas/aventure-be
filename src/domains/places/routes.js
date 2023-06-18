const router = require('express').Router()
const Controller = require('./controller')

router.get('/', Controller.findPlaces)
router.post('/', Controller.addPlace)

module.exports = router
