const router = require('express').Router()
const Controller = require('./controller')

router.post('/', Controller.createAdventure)
router.get('/', Controller.getAdventures)

module.exports = router
