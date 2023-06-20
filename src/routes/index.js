const router = require('express').Router()

router.use('/places', require('../domains/places'))
router.use('/trips', require('../domains/trips'))

module.exports = router
