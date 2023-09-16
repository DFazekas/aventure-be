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
  let queryOptions = {}
  try {
    const categories = req.query.categories
    if (categories.length > 0) {
      queryOptions = {
        'metadata.tags': { $all: categories.split(',') }
      }
    }

    console.log(`categories:`, categories.split(','))
    const adventures = await AdventureModel.find(queryOptions, '-_id -__v')
      .limit(10)
      .exec()

    if (adventures.length === 0) {
      res.status(404).json({ message: 'No adventures found' })
      return
    }
    res.status(200).json(adventures)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createAdventure,
  getAdventures
}
