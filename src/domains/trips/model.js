const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema(
  {
    itinerary_type: String,
    notes: String
  },
  {
    _id: false, // Disable automatic generation of _id
    discriminatorKey: 'itinerary_type'
  }
)

const travelSchema = new mongoose.Schema(
  {
    travel_method: String,
    duration: {
      type: {
        start: Date,
        end: Date
      },
      _id: false // Disable automatic generation of _id
    },
    formatted_duration: String,
    distance_km: Number,
    cost_dollars: Number,
    origin: {
      type: {
        lat: Number,
        lng: Number
      },
      _id: false // Disable automatic generation of _id
    },
    destination: {
      type: {
        lat: Number,
        lng: Number
      },
      _id: false // Disable automatic generation of _id
    },
    party_size: Number
  },
  { _id: false }
)
const placeSchema = new mongoose.Schema(
  {
    place_type: String,
    place_id: String,
    duration: {
      type: {
        start: Date,
        end: Date
      },
      _id: false // Disable automatic generation of _id
    },
    formatted_duration: String,
    cost_dollars: Number,
    party_size: Number
  },
  { _id: false }
)

const ItineraryModel = new mongoose.model('Itinerary', itinerarySchema)
const TravelModel = ItineraryModel.discriminator('Travel', travelSchema)
const PlaceModel = ItineraryModel.discriminator('Place', placeSchema)

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  metadata: {
    city: { type: String, required: true },
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
    weather: [String], // sunny, rainy, snowy, cloudy, windy, stormy, foggy, clear, hot, cold, warm, cool
    temperature: String, // degrees celcius
    time_of_day: [String],
    season: String // spring, summer, autumn, winter
  },
  itinerary: { type: [itinerarySchema], required: true }
})

const TripModel = mongoose.model('Trip', tripSchema)

module.exports = { TripModel, PlaceModel, TravelModel }
