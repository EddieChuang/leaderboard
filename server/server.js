'use strict'
require('babel-core/register')

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const secretConfig = require('./config/secret')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const app = express()
const http = require('http').Server(app)

mongoose.connect(
  secretConfig.database,
  err => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Connected to the mongo database')
  }
)

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const authJWT = require('./middleware/auth-jwt')
const userRoutes = require('./routes/user')
const competitionRoutes = require('./routes/competition')
app.use('/api', authJWT)
app.use(userRoutes)
app.use('/competition', competitionRoutes)
app.get('*', (req, res) => {
  // console.log(req.get('host') + req.originalUrl)
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 3000
http.listen(port, err => {
  if (err) console.log(err)
  console.log('Server is listening on port 3000 ...')
})
