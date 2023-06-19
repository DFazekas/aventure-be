const router = require('express').Router()
const Controller = require('./controller')

router.get('/', Controller.getAllPlacesByCityAndType)
router.post('/', Controller.addPlace)

module.exports = router
