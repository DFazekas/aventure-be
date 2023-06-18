const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
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
    icon: String,
    name: String,
    opening_hours: String,
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
  }
})

PlaceSchema.index({ coordinates: '2dsphere' })

const PlaceModel = mongoose.model('place', PlaceSchema)

module.exports = PlaceModel
