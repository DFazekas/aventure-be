const { TripModel, PlaceModel, TravelModel } = require('./model')

const createTrip = async (req, res, next) => {
  try {
    const data = req.body

    const itinerary = data.itinerary.map((item) => {
      if (item.itinerary_type === 'Travel') {
        return new TravelModel(item)
      } else if (item.itinerary_type === 'Place') {
        return new PlaceModel(item)
      } else {
        throw new Error(`Unknown itinerary type: ${item.type}`)
      }
    })

    const trip = new TripModel({ ...data, itinerary })

    await trip.save()
    res.status(201).json(trip)
  } catch (error) {
    next(error)
  }
}

module.exports = { createTrip }
