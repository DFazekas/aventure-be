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
          type: type,
          radius: radius,
          key: apiKey
        }
      }
    )

    const places = response.data.results
    return places
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch places from Google Maps.')
  }
}

const fetchPlaceDetailsFromGoogleMaps = async (placeId, city) => {
  try {
    const place = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          place_id: placeId,
          key: process.env.GOOGLE_MAPS_API_KEY
        }
      }
    )
    return new PlaceModel.new(place.data.result, city)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch place details from Google Maps.')
  }
}

module.exports = { fetchPlacesFromGoogleMaps, fetchPlaceDetailsFromGoogleMaps }
