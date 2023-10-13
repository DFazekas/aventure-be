const { AdventureModel, PlaceModel, TravelModel } = require('./model')

const createAdventure = async (req, res, next) => {
  try {
    const data = req.body

    const adventureDuration = req.body.duration
    adventureDuration.formatted_duration = '15 mins' //FIXME - calculate this.

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

    const adventure = new AdventureModel({ ...data, itinerary })

    await adventure.save()
    res.status(201).json(adventure)
  } catch (error) {
    next(error)
  }
}

const getAdventures = async (req, res, next) => {
  try {
    // Extract the query parameters.
    const { state, page = 1, limit = 20 } = req.query

    // Validate the `state` parameter.
    if (state !== 'active' && state !== 'inactive') {
      return res.status(400).json({
        error: 'Invalid state parameter. Must be "active" or "inactive".'
      })
    }

    // Ensure the `limit` parameter is capped at a maximum value of 50.
    const minLimit = Math.max(Number(limit), 1)
    const cappedLimit = Math.min(Number(minLimit), 50)

    // Query the database to get the total count of adventures.
    const totalAdventures = await AdventureModel.countDocuments({ state })

    // Calculate the maximum valid page based on the total number of adventures.
    const maxPage = Math.max(Math.ceil(totalAdventures / cappedLimit), 1)

    // Ensure the requested `page` is within valid range.
    const validPage = Math.min(Number(page), maxPage)

    // Calculate the skip value for pagination.
    const skip = (validPage - 1) * cappedLimit

    // Check if the calculated skip value is negative (page out of range).
    if (skip < 0) {
      const error = new Error('Page number must be positive.')
      error.status = 400
      throw error
    }

    // Query the database based on the state and pagination parameters.
    const adventures = await AdventureModel.find(
      { state },
      '-itinerary -metadata -__v'
    )
      .skip(skip)
      .limit(cappedLimit)
      .exec()

    // Prepare the response as JSON.
    const response = {
      adventures,
      pagination: {
        page: validPage,
        limit: cappedLimit,
        total: totalAdventures
      }
    }
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createAdventure,
  getAdventures
}
