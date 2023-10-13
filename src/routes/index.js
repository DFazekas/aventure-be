const router = require('express').Router()

router.use('/places', require('../domains/places'))
router.use('/adventures', require('../domains/adventures'))
router.use('/categories', require('../domains/categories'))

module.exports = router
