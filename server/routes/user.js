const router = require('express').Router()
const User = require('../models/user')
const secretConfig = require('../config/secret')
const jwt = require('jsonwebtoken')

router.route('/user/signup').post((req, res, next) => {
  const { username, password } = req.body
  User.findOne({ username }, function(err, existingUser) {
    if (err) {
      res.status(400)
      res.json({ status: false, message: err })
    } else if (existingUser) {
      res.status(400)
      res.json({ status: false, message: 'The username already exists' })
    } else if (!existingUser) {
      let newUser = User()
      newUser.username = username
      newUser.password = password
      newUser.save(err => {
        if (err) {
          res.status(400)
          res.json({ status: false, message: err })
        } else {
          res.status(200)
          res.json({ status: true, message: 'Sign up successfully' })
        }
      })
    }
  })
})

router.route('/user/signin').post((req, res, next) => {
  const { username, password } = req.body
  User.findOne({ username }, function(err, user) {
    if (err) {
      res.status(400)
      res.json({ status: false, message: err })
    } else if (!user) {
      res.status(400)
      res.json({ status: false, message: 'The username does not exist' })
    } else if (!user.comparePassword(password)) {
      res.status(400)
      res.json({ status: false, message: 'The password is wrong' })
    } else {
      res.status(200)
      const payload = Object.assign({}, { _id: user._id })
      const token = jwt.sign(payload, secretConfig.secret, {
        expiresIn: secretConfig.expiresIn
      })
      let resUser = {
        username: user.username,
        password: user.password,
        type: user.type
      }
      // const expire = new Date().getTime() + secretConfig.expiresIn
      res.json({
        status: true,
        message: 'Sign in successfully',
        token,
        resUser
      })
    }
  })
})

// router.get('/api/user/logout', (req, res, next) => {
//   req.logout()
//   res.status(200)
//   res.json({ message: 'Logout successfully' })
// })
// router.get('/api/user/:id', (req, res, next) => {
//   let id = req.params.id
//   User.findOne({ _id: id }, '_id name email photo tweets followers followings')
//     .populate('followers followings')
//     .exec(function(err, user) {
//       res.json({ user })
//     })
// })

module.exports = router
