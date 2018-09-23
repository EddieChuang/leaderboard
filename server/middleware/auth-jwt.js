const secretConfig = require('../config/secret')
const jwt = require('jsonwebtoken')
let authJWT = require('express').Router()

authJWT.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.token
  if (token) {
    jwt.verify(token, secretConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: '請重新登入' })
      } else {
        req.payload = decoded
        next()
      }
    })
  } else {
    return res.status(403).json({
      success: false,
      message: 'No token provided'
    })
  }
})

module.exports = authJWT
