/**
 * limitWords
 * A filter for limiting words to the amount passed in, adds ellipsis to the end
 *
 * USE:
 * {{some.stringData | limitWords:6}}
 */
module.exports = function () {
  return function (input, words) {
    if (isNaN(words)) return input
    if (words <= 0) return ''
    if (input) {
      var inputWords = input.split(/\s+/)
      if (inputWords.length > words) {
        input = inputWords.slice(0, words).join(' ') + '…'
      }
    }

    return input
  }
}
