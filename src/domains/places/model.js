const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  },
  properties: {
    business_status: String,
    formatted_address: String,
    viewport: {
      northeast: {
        lat: String,
        lng: String
      },
      southwest: {
        lat: String,
        lng: String
      }
    },
    icon: {
      url: String,
      background_color: String,
      mask_base_uri: String
    },
    plus_code: {
      compound_code: String,
      global_code: String
    },
    name: String,
    opening_hours: {
      open_now: Boolean
    },
    photos: [
      {
        height: Number,
        html_attributions: [String],
        photo_reference: String,
        width: Number
      }
    ],
    place_id: String,
    rating: Number,
    reference: String,
    scope: String,
    types: [String],
    user_ratings_total: Number,
    vicinity: String
  },
  expiry_time: Date
})

placeSchema.statics.new = function (place, city) {
  let instance = new PlaceModel()

  const data = {
    type: 'Point',
    coordinates: [place.geometry?.location.lng, place.geometry?.location.lat],
    properties: {
      business_status: place.business_status,
      formatted_address: place.formatted_address,
      viewport: place.geometry?.viewport,
      icon: {
        url: place.icon,
        background_color: place.icon_background_color,
        mask_base_uri: place.icon_mask_base_uri
      },
      plus_code: place.plus_code,
      name: place.name,
      opening_hours: {
        open_now: place.opening_hours?.open_now
      },
      photos: place.photos,
      place_id: place.place_id,
      rating: place.rating,
      reference: place.reference,
      scope: place.scope,
      types: place.types,
      user_ratings_total: place.user_ratings_total,
      vicinity: city
    },
    expiry_time: new Date().getTime() + 30 * 24 * 60 * 60 * 1000 // 30 days from the current time
  }
  Object.assign(instance, data)
  return instance
}

// Enables querying for places by location.
placeSchema.index({ coordinates: '2dsphere' })

const PlaceModel = mongoose.model('place', placeSchema)

module.exports = PlaceModel
