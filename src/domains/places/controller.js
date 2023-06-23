const { validatePlaceType } = require('./validators')
const PlaceModel = require('./model')
const {
  fetchPlacesFromGoogleMaps,
  fetchPlaceDetailsFromGoogleMaps
} = require('./services')
const placeTypes = require('./placeTypes.json')

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
    const { city, type, budget } = req.query

    validatePlaceType(type)

    // FIXME: Filtering by budget doesn't work perfectly. Needs to be investigated.
    const filters = {
      'properties.types': type,
      'properties.vicinity': city
    }
    if (budget !== 5) {
      filters['properties.price_level'] = budget
    }
    const places = await PlaceModel.find(filters).exec()

    if (places.length > 0) {
      res.status(200).json({ updated: false, matches: places })
      return
    }

    // Fetch data from Google Places API since it doesn't exist or is expired.
    //FIXME: This only fetches the first page of results. Need to fetch all pages.
    const fetchedLowResPlaces = await fetchPlacesFromGoogleMaps(city, type)
    const placeDetailsPromises = fetchedLowResPlaces.map((place) =>
      fetchPlaceDetailsFromGoogleMaps(place.place_id, city)
    )
    const fetchedHighResPlaces = await Promise.all(placeDetailsPromises)

    await PlaceModel.create(fetchedHighResPlaces)
    res.status(201).json({ updated: true, matches: fetchedHighResPlaces })
  } catch (error) {
    next(error)
  }
}

const getPlaceById = async (req, res, next) => {
  try {
    const placeId = req.params.id
    const place = await PlaceModel.findById(placeId).exec()

    if (!place) {
      res.status(404).json({ message: 'Place not found' })
      return
    }

    res.status(200).json(place)
  } catch (error) {
    next(error)
  }
}

const getPlaceTypes = async (req, res, next) => {
  try {
    res.status(200).json(placeTypes)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addPlace,
  getAllPlacesByCityAndType,
  getPlaceById,
  getPlaceTypes
}
