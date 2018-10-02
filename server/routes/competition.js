const router = require('express').Router()
const multer = require('multer')
const async = require('async')
const path = require('path')
const fse = require('fs-extra')

// const Competition = require('../models/competition')

// get all competition
// router.get('/', (req, res, next) => {
//   Tweet.find({})
//     .sort('created')
//     .populate({
//       path: 'owner comments',
//       select: '_id name text speaker created',
//       populate: {
//         path: 'speaker',
//         select: '_id name photo'
//       }
//     })
//     .exec(function(err, tweets) {
//       // console.log(tweets)
//       res.json({ tweets })
//     })
// })

// get the competition with _id==id
// router.post('/:id', (req, res, next) => {
//   let id = req.params.id
//   Tweet.find({ owner: id }, function(err, tweets) {
//     res.json({ tweets })
//   })
// })

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    console.log(file)
    const title = file.fieldname.split('/')[0]
    const competitionDir = path.join(__dirname, `../upload/${title}`)
    const uploadDir = path.join(__dirname, `../upload/${file.fieldname}`)
    console.log(competitionDir)
    console.log(uploadDir)

    if (!fse.pathExistsSync(competitionDir)) {
      fse.ensureDirSync(competitionDir)
    }
    if (!fse.pathExistsSync(uploadDir)) {
      fse.ensureDirSync(uploadDir)
    }

    // fse.removeSync(uploadDir) // ensure  the directory is empty
    // fse.ensureDirSync(uploadDir)

    callback(null, uploadDir)
  },
  filename: function(req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage })

// create a new competition
router.route('/create').post(upload.any(), (req, res, next) => {
  // let { title, description, dataDescription, launchDate, closeDate } = req.body
  // Competition.find({ title }, function(err, existingCompetition) {
  //   if (existingCompetition) {
  //     res.status(400)
  //     res.json({ status: false, message: `Title ${title} is already taken.` })
  //   }
  // })

  async.waterfall([
    // upload data source files
    function(callback) {
      data = ''
      callback(null, data)
    },
    // upload solution files
    function(data, callback) {
      callback(null, data)
    },
    // save competition
    function(data, callback) {
      res.status(200)
      res.json({ status: true, message: '新增成功' })
      // let newCompetition = new Exercise()
      // newCompetition.title = title
      // newCompetition.description = description
      // newCompetition.dataDescription = dataDescription
      // newCompetition.launchDate = launchDate
      // newCompetition.closeDate = closeDate
      // newCompetition.save(function(err) {
      //   if (err) {
      //     res.status(400)
      //     res.json({ status: false, message: '伺服器錯誤' })
      //   } else {
      //     res.status(200)
      //     res.json({ status: true, message: '新增成功', newExercise })
      //   }
      // })
    }
  ])
})

router.route('/get').post((req, res, next) => {
  Exercise.find({})
    .sort('created')
    .exec(function(err, exercises) {
      if (err) {
        res.status(400)
        res.json({ status: false, message: '伺服器錯誤' })
      } else {
        res.status(200)
        res.json({ status: true, exercises })
      }
    })
})

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
