const router = require('express').Router()
const User = require('../models/user')
const Exercise = require('../models/exercise')

// router.get('/api/tweet/', (req, res, next) => {
//   Tweet.find({})
//     .sort('-created')
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
// router.post('/api/tweet/:id', (req, res, next) => {
//   let id = req.params.id
//   Tweet.find({ owner: id }, function(err, tweets) {
//     res.json({ tweets })
//   })
// })

router.route('/add').post((req, res, next) => {
  let { name, unit, start, end } = req.body
  let newExercise = new Exercise()
  newExercise.name = name
  newExercise.unit = unit
  newExercise.start = start
  newExercise.end = end
  newExercise.save(function(err) {
    if (err) {
      res.status(400)
      res.json({ status: false, message: '伺服器錯誤' })
    } else {
      res.status(200)
      res.json({ status: true, message: '新增成功', newExercise })
    }
  })
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
