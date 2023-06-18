const PlaceModel = require('./model')

const addPlace = async (req, res, next) => {
  try {
    console.log(req.body)

    const originalObject = req.body

    const convertedObject = {
      type: 'Point',
      coordinates: [
        originalObject.geometry.location.lng,
        originalObject.geometry.location.lat
      ],
      properties: {
        business_status: originalObject.business_status,
        icon: originalObject.icon,
        name: originalObject.name,
        opening_hours:
          originalObject.opening_hours && originalObject.opening_hours.open_now
            ? 'Open'
            : 'Closed',
        photos: originalObject.photos,
        place_id: originalObject.place_id,
        rating: originalObject.rating,
        reference: originalObject.reference,
        scope: originalObject.scope,
        types: originalObject.types,
        user_ratings_total: originalObject.user_ratings_total,
        vicinity: originalObject.vicinity
      }
    }

    const place = await PlaceModel.create(convertedObject)
    res.status(201).json(place)
  } catch (error) {
    next(error)
  }
}


module.exports = { addPlace
}
