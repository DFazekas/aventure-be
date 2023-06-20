const mongoose = require('mongoose')

const HoursOfOperationsSchema = new mongoose.Schema({
  close: {
    day: { type: Number, required: true },
    time: { type: String, required: true }
  },
  open: {
    day: { type: Number, required: true },
    time: { type: String, required: true }
  }
})

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
    business_status: { type: String, required: true },
    curbside_pickup: Boolean,
    formatted_address: String,
    formatted_phone_number: String,
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
    name: { type: String, required: true },
    opening_hours: {
      periods: [HoursOfOperationsSchema],
      weekday_text: [String]
    },
    photos: [
      {
        height: Number,
        html_attributions: [String],
        photo_reference: String,
        width: Number
      }
    ],
    delivery: Boolean,
    dine_in: Boolean,
    price_level: Number,
    reservable: Boolean,
    place_id: { type: String, required: true },
    rating: Number,
    reference: String,
    scope: String,
    types: { type: [String], required: true },
    website: String,
    user_ratings_total: Number,
    vicinity: { type: String, required: true },
    wheelchair_accessible_entrance: Boolean
  },
  expiry_time: { type: Date, required: true }
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
      opening_hours: place.opening_hours,
      photos: place.photos,
      delivery: place.delivery,
      dine_in: place.dine_in,
      price_level: place.price_level,
      reservable: place.reservable,
      website: place.website,
      wheelchair_accessible_entrance: place.wheelchair_accessible_entrance,
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
