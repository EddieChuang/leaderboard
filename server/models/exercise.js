const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ExerciseSchema = new Schema({
  name: String,
  unit: String,
  start: String,
  end: String // instructor, student
})

module.exports = mongoose.model('Exercise', ExerciseSchema, 'Exercise')
