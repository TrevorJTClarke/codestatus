/**
 * autoformat
 * A filter for formatting text, IE comments with mentions, mention all the things!
 *
 * USE:
 * {{comment | autoformat}}
 */
module.exports = function () {
  return function (str) {
    if (!str || typeof str === undefined) return ''

    // strip out any screwed up string values
    str = str.replace(/\<strong class=\"mention\"\>/g, '').replace(/\<\/strong>/g, '')

    // -strikethrough-
    .replace(/-([A-Za-z](.*[A-Za-z]+)?)-/gi, '<del>$1</del>')

    // *bold*
    .replace(/\*(.*?)\*/g, '<b>$1</b>')

    // _italics_
    .replace(/\_(.*?)\_/g, '<em>$1</em>')

    // format correctly!
    return str.replace(/(?:\@\[(\d)*:)([A-z+\s[0-9]+]{0,300})(?:\])/g, '<strong class="mention">$2</strong>')
  }
};
