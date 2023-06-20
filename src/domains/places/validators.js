const validatePlaceType = (type) => {
  const validTypes = [
    'amusement_park',
    'aquarium',
    'art_gallery',
    'bowling_alley',
    'cafe',
    'campground',
    'casino',
    'movie_theater',
    'museum',
    'night_club',
    'park',
    'restaurant',
    'tourist_attraction',
    'zoo'
  ]

  if (!validTypes.includes(type)) {
    throw new Error(`Unsupported place type (${type})`)
  }
}

module.exports = { validatePlaceType }
