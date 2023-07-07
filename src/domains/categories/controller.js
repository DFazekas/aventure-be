const { CategoryModel } = require('./model')

const createCategories = async (req, res, next) => {
  try {
    const data = req.body

    const categoryPromises = data.map((category) => {
      return new CategoryModel({
        label: category.label
      }).save()
    })

    await Promise.all(categoryPromises)
    res.status(201).json(data)
  } catch (error) {
    next(error)
  }
}

const getAllCategories = async (req, res, next) => {
  try {
    const categoryObjs = await CategoryModel.find({}, '-_id -__v').exec()
    const categories = categoryObjs.map((category) => category.label) // Flatten to a single list of labels.
    res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
}

module.exports = { createCategories, getAllCategories }
