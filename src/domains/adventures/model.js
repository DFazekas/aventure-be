const mongoose = require('mongoose')
const { Schema } = mongoose

const durationSchema = new Schema(
  {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    formatted_duration: { type: String, required: true }
  },
  { _id: false }
)

const activitySchema = new Schema(
  {
    type: { type: String, required: true },
    notes: { type: String, default: '' },
    duration: { type: durationSchema, required: true },
    party_size: { type: Number, required: true },
    cost_dollar: { type: Number, required: true }
  },
  {
    discriminatorKey: 'type',
    _id: false
  }
)

const itinerarySchema = new Schema({
  date: { type: Date, required: true },
  activities: {
    type: [activitySchema],
    required: true
  }
})
const coordinateSchema = new Schema({
  lat: { type: Number },
  lng: { type: Number }
})

const adventureSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: durationSchema, required: true },
  metadata: {
    city: { type: String, required: true },
    country: { type: String, required: true },
    travel_methods: { type: [String], required: true },
    party_sizes: {
      type: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
      },
      _id: false // Disable automatic generation of _id
    },
    budget_dollars: { type: Number, required: true },
    tags: { type: [String], required: true },
    weather: { type: [String] }, // sunny, rainy, snowy, cloudy, windy, stormy, foggy, clear, hot, cold, warm, cool
    temperature: { type: String }, // degrees celcius
    time_of_day: { type: [String] },
    season: { type: String }, // spring, summer, autumn, winter
    cover_image_url: { type: String }
  },
  itinerary: { type: [itinerarySchema], required: true }
})

const AdventureModel = mongoose.model('Adventure', adventureSchema)
const ActivityModel = mongoose.model('Activity', activitySchema)
const TravelModel = ActivityModel.discriminator(
  'Travel',
  new Schema({
    travel_method: { type: String, required: true },
    path: {
      type: {
        distance_km: { type: Number, required: true },
        origin: { type: coordinateSchema, required: true },
        destination: { type: coordinateSchema, required: true }
      },
      required: true,
      _id: false
    }
  })
)
const PlaceModel = ActivityModel.discriminator(
  'Place',
  new Schema({
    place_type: { type: String, required: true },
    place_id: { type: String, required: true }
  })
)

module.exports = { AdventureModel, PlaceModel, TravelModel }
