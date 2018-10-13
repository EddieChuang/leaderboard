const router = require('express').Router()
const multer = require('multer')
const async = require('async')
const path = require('path')
const fse = require('fs-extra')
const moment = require('moment')

const Competition = require('../models/competition')

const dateFormat = 'YYYY-MM-DD HH:mm'

router.post('/get', (req, res, next) => {
  let { competitionId } = req.body
  Competition.findById(competitionId).exec(function(err, competition) {
    if (err) {
      return res.status(500).json({ message: 'Server Error' })
    }
    res.status(200).json({ competition })
  })
})

// get all competition
router.post('/getall', (req, res, next) => {
  const now = moment().format(dateFormat)
  Competition.find({ launchDate: { $lt: now }, closeDate: { $gt: now } })
    .sort('createdDate')
    .select('_id title')
    .exec(function(err, competitions) {
      if (err) {
        return res.status(500).json({ message: 'Server Error' })
      }
      res.status(200).json({ competitions })
    })
})

// get the competition with _id==id
// router.post('/:id', (req, res, next) => {
//   let id = req.params.id
//   Tweet.find({ owner: id }, function(err, tweets) {
//     res.json({ tweets })
//   })
// })

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    const title = file.fieldname.split('/')[0]
    const competitionDir = path.join(__dirname, `../upload/${title}`)
    const uploadDir = path.join(__dirname, `../upload/${file.fieldname}`)

    !fse.pathExistsSync(competitionDir) ? fse.ensureDirSync(competitionDir) : ''
    !fse.pathExistsSync(uploadDir) ? fse.ensureDirSync(uploadDir) : ''

    callback(null, uploadDir)
  },
  filename: function(req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage }).any()

// create a new competition
router.route('/create/:title').post((req, res, next) => {
  let { title } = req.params
  Competition.findOne({ title }, function(err, existingCompetition) {
    if (existingCompetition) {
      res.status(400).json({
        status: false,
        message: `Title ${title} is already taken.`
      })
    } else {
      upload(req, res, err => {
        if (err) {
          res
            .status(400)
            .json({ status: false, message: 'Failed to upload files.' })
        }

        let { description, dataDescription, launchDate, closeDate } = req.body
        let dataSources = req.files
          .filter(file => file.fieldname.split('/')[1] === 'data sources') // file type
          .map(file => file.filename)
        let solution = req.files
          .filter(file => file.fieldname.split('/')[1] === 'solution') // file type
          .map(file => file.filename)

        let newCompetition = new Competition()
        newCompetition.title = title
        newCompetition.description = description
        newCompetition.dataDescription = dataDescription
        newCompetition.launchDate = launchDate
        newCompetition.closeDate = closeDate
        newCompetition.dataSources = dataSources
        newCompetition.dataSources = solution

        newCompetition.save(function(err) {
          if (err) {
            res.status(400)
            res.json({ status: false, message: 'Server Error' })
          } else {
            let competition = {
              _id: newCompetition._id,
              title: newCompetition.title
            }
            res
              .status(200)
              .json({ status: true, message: 'Success', competition })
          }
        })
      })
    } // end of else
  })
})

// router.route('/get').post((req, res, next) => {
//   Exercise.find({})
//     .sort('created')
//     .exec(function(err, exercises) {
//       if (err) {
//         res.status(400)
//         res.json({ status: false, message: '伺服器錯誤' })
//       } else {
//         res.status(200)
//         res.json({ status: true, exercises })
//       }
//     })
// })

// router.post('/api/tweet/like', (req, res, next) => {
//   const { id, idToLike } = req.body
//   Tweet.findByIdAndUpdate(idToLike, { $push: { like: { user: id } } }, function(
//     err,
//     count
//   ) {
//     Tweet.findById(idToLike)
//       .populate('owner', '_id name')
//       .exec(function(err, tweet) {
//         res.json({ tweet })
//       })
//   })
// })

// router.post('/api/tweet/unlike', (req, res, next) => {
//   const { id, idToUnlike } = req.body
//   Tweet.findByIdAndUpdate(
//     idToUnlike,
//     { $pull: { like: { user: id } } },
//     function(err, count) {
//       Tweet.findById(idToUnlike)
//         .populate('owner', '_id name')
//         .exec(function(err, tweet) {
//           res.json({ tweet })
//         })
//     }
//   )
// })

// router.post('/api/tweet/newComment', (req, res, next) => {
//   const { id, tweetId, commentText } = req.body
//   let comment = Comment()
//   comment.speaker = mongoose.Types.ObjectId(id)
//   comment.text = commentText
//   comment.save(function(err) {
//     Tweet.findByIdAndUpdate(
//       tweetId,
//       { $push: { comments: comment._id } },
//       function(err, count) {
//         Tweet.findById(tweetId)
//           .sort('-created')
//           // .populate('comments', 'text created')
//           .populate({
//             path: 'owner comments',
//             select: '_id name text speaker created',
//             populate: {
//               path: 'speaker',
//               select: '_id name photo'
//             }
//           })
//           .exec(function(err, tweet) {
//             console.log(tweet)
//             res.json({ tweet, comments: tweet.comments })
//           })
//       }
//     )
//   })
// })

module.exports = router
