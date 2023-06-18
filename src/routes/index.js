const router = require('express').Router()

router.use('/places', require('../domains/places'))

module.exports = router
