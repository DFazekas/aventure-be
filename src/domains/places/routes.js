const router = require('express').Router()
const Controller = require('./controller')

router.get('/types', Controller.getPlaceTypes)
router.get('/', Controller.getAllPlacesByCityAndType)
router.get('/:id', Controller.getPlaceById)
router.post('/', Controller.addPlace)

module.exports = router
