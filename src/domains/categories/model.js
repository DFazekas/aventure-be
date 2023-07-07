const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
  label: { type: String, required: true }
})

const CategoryModel = mongoose.model('Category', categorySchema)

module.exports = { CategoryModel }
