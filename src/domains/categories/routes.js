const router = require('express').Router()
const Controller = require('./controller')

router.post('/', Controller.createCategories)
router.get('/', Controller.getAllCategories)

module.exports = router
