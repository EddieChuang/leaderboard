const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CompetitionSchema = new Schema({
  title: String,
  description: String,
  dataDescription: String,
  dataSources: [{ filepath: String, filename: String }],
  solution: [{ filepath: String, filename: String }],
  launchDate: { type: Date },
  closeDate: { type: Date }
})

// CompetitionSchema.methods.getAll = function() {
//   return bcrypt.compareSync(password, this.password)
// }

// CompetitionSchema.methods.get = function(id) {
//   return bcrypt.compareSync(password, this.password)
// }

module.exports = mongoose.model('Competition', CompetitionSchema, 'Competition')
