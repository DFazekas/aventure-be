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

const coordinateSchema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
})

const itinerarySchema = new Schema(
  {
    itinerary_type: { type: String },
    notes: { type: String }
  },
  {
    _id: false, // Disable automatic generation of _id
    discriminatorKey: 'itinerary_type'
  }
)

const travelSchema = new Schema(
  {
    travel_method: { type: String, required: true },
    duration: { type: durationSchema, required: true },
    distance_km: { type: Number, required: true },
    cost_dollars: { type: Number, required: true },
    origin: { type: coordinateSchema, required: true },
    destination: { type: coordinateSchema, required: true },
    party_size: { type: Number, required: true }
  },
  { _id: false }
)
const placeSchema = new Schema(
  {
    place_type: { type: String, required: true },
    place_id: { type: String, required: true },
    duration: {
      type: durationSchema,
      required: true
    },
    cost_dollars: { type: Number, required: true },
    party_size: { type: Number, required: true }
  },
  { _id: false }
)

const ItineraryModel = new mongoose.model('Itinerary', itinerarySchema)
const TravelModel = ItineraryModel.discriminator('Travel', travelSchema)
const PlaceModel = ItineraryModel.discriminator('Place', placeSchema)

const tripSchema = new Schema({
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
    weather: { type: [String] }, // sunny, rainy, snowy, cloudy, windy, stormy, foggy, clear, hot, cold, warm, cool
    temperature: { type: String }, // degrees celcius
    time_of_day: { type: [String] },
    season: { type: String } // spring, summer, autumn, winter
  },
  itinerary: { type: [itinerarySchema], required: true }
})

const TripModel = mongoose.model('Trip', tripSchema)

module.exports = { TripModel, PlaceModel, TravelModel }
