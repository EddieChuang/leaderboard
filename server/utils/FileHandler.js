const fs = (module.exports = {
  getFileExtension: filename => {
    let pos = filename.lastIndexOf('.')
    return pos < filename.length ? filename.slice(pos + 1) : ''
  },
  removeAllFiles: directory => {
    fs.readdirSync(directory, (err, files) => {
      if (err) {
        throw err
      }

      for (const file of files) {
        fs.unlinkSync(path.join(directory, file))
      }
    })
  }
})
