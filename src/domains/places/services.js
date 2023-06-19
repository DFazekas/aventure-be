const axios = require('axios')
const PlaceModel = require('./model')

const fetchPlacesFromGoogleMaps = async (city, type, radius = 100) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          query: `${type} in ${city}`,
          radius: radius,
          key: apiKey
        }
      }
    )

    const results = response.data.results

    const places = results.map(async (place) => {
      const placeId = place.place_id

      // Check if the place exists in the database.
      const existingPlace = await PlaceModel.findOne({
        place_id: placeId
      }).exec()

      if (existingPlace) {
        existingPlace.expiry_time =
          new Date().getTime() + 30 * 24 * 60 * 60 * 1000 // Update the expiry time to 30 days from the current time
        return await existingPlace.save()
      }

      // Create new database entry.
      const newPlace = new PlaceModel.new(place, city)
      return await newPlace.save()
    })

    return await Promise.all(places)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch places from Google Maps:')
  }
}

module.exports = { fetchPlacesFromGoogleMaps }
