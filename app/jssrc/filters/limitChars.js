/**
 * limitChars
 * A filter for limiting characters to the amount passed in, adds ellipsis to the end
 *
 * USE:
 * {{some.stringData | limitChars:6}}
 */
module.exports = function () {
  return function (input, chars) {
    if (isNaN(chars)) return input
    if (chars <= 0) return ''
    if (input && input.length > chars) {
      input = input.substring(0, chars)

      while (input.charAt(input.length - 1) === ' ') {
        input = input.substr(0, input.length - 1)
      }

      return input + '…'
    }

    return input
  }
}
