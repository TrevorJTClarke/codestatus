/**
 * removeAt
 * A filter for formatting text, IE comments with mentions, mention all the things!
 *
 * USE:
 * {{some.value | remove-at}}
 */
module.exports = function () {
  return function (str) {
    if (str.length < 1) return str

    // format correctly!
    return str.replace(/\@/g, '')
  }
};
