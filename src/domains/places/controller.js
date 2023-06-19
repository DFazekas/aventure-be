const PlaceModel = require('./model')
const { fetchPlacesFromGoogleMaps } = require('./services')

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

const getAllPlacesByCityAndType = async (req, res, next) => {
  try {
    const originalObject = req.body
    const { city, type } = req.query


    const places = await PlaceModel.find({
      'properties.types': type,
      'properties.vicinity': city
    }).exec()

    if (places.length > 0) {
      res.status(200).json({ updated: false, matches: places })
      return
    }

    // Fetch data from Google Places API since it doesn't exist or is expired.
    const fetchedPlaces = await fetchPlacesFromGoogleMaps(city, type)

    res.status(200).json({ updated: true, matches: fetchedPlaces })
  } catch (error) {
    next(error)
  }
}

const findPlaces = async (req, res, next) => {
  try {
    console.log(req.query)
    const center = req.query.center.split(',').map((coor) => Number(coor)) // [lat,lng]
    const radius = Number(req.query.radius)

    const places = await PlaceModel.find({
      coordinates: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: center
          },
          $maxDistance: radius
        }
      }
    })
    res.status(200).json({ matches: places })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addPlace,
  getAllPlacesByCityAndType
}
