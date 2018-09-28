export default {
  /**
   * get file extension
   * @param {String} filename file name
   */
  getFileExtension: filename => {
    let pos = filename.lastIndexOf('.')
    return pos < filename.length ? filename.slice(pos + 1) : ''
  },

  /**
   * [...appended, ...toappend] without duplicated file name
   * @param {List} appended list of File to be appended
   * @param {List} toappend list of File that append to appended
   */
  appendDistinct: (appended, toappend) => {
    let filenameSet = new Set(appended.map(file => file.name))
    return toappend.reduce((newList, currVal) => {
      newList = filenameSet.has(currVal.name) ? newList : [...newList, currVal]
      filenameSet.add(currVal.name)
      return newList
    }, appended)
  }
}
