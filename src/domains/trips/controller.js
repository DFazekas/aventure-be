const { TripModel, PlaceModel, TravelModel } = require('./model')

const createTrip = async (req, res, next) => {
  try {
    const data = req.body

    const tripDuration = req.body.duration
    tripDuration.formatted_duration = '15 mins' //FIXME - calculate this.

    const itinerary = Object.keys(req.body.itinerary).map((date) => {
      const activities = data.itinerary[date].map((activity) => {
        const activityFormattedDuration = '15 mins' //FIXME - calculate this.
        const duration = {
          ...activity.duration,
          formatted_duration: activityFormattedDuration
        }

        const type = activity.type
        if (type === 'Travel') {
          return new TravelModel({
            ...activity,
            duration,
            travel_method: activity.travel_method
          })
        } else if (type === 'Point') {
          return new PlaceModel({ ...activity, duration })
        } else {
          throw new Error(`Unknown itinerary type: ${activity.type}`)
        }
      })

      return { date, activities }
    })

    const trip = new TripModel({ ...data, itinerary })

    await trip.save()
    res.status(201).json(trip)
  } catch (error) {
    next(error)
  }
}

module.exports = { createTrip }
