const router = require('express').Router()

router.use('/places', require('../domains/places'))
router.use('/trips', require('../domains/trips'))
router.use('/categories', require('../domains/categories'))

module.exports = router
