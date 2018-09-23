const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: String,
  password: String,
  admin: { type: String, default: '0' } // 0: user, 1: admin
})

UserSchema.pre('save', function(next) {
  let user = this

  if (user.password) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next()
      }
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) {
          return next()
        }
        user.password = hash
        next(err)
      })
    })
  }
})

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

// (model name, model schema, collection name)
// https://stackoverflow.com/questions/28777907/mongoose-js-findone-always-returns-null
module.exports = mongoose.model('User', UserSchema, 'User')
