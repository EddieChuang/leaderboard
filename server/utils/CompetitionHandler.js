module.exports = {
  isExists: title => {
    Competition.find({ title }, function(err, competition) {
      if (competition) {
        res.status(400)
        res.json({ status: false, message: `Title ${title} is already taken.` })
      }
    })
  }
}
