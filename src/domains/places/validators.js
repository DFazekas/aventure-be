const placeTypes = require('./placeTypes.json')
const validatePlaceType = (type) => {
  let hasError = true
  placeTypes.forEach((placeType) => {
    if (placeType.value === type) {
      hasError = false
    }
  })

  if (hasError) {
    throw new Error(`Unsupported place type (${type})`)
  }
}

module.exports = { validatePlaceType }
