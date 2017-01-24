/**
 * Header Handler and Auth
 */
module.exports = {

  // catalog of valid header types
  types: ['x-codestatus-key', 'accept', 'content-type'],
  authTypes: ['Authorization'],

  // Checks all added headers and makes sure they are valid!
  isValid: function (h) {
    var bool = true
    var _this = this

    /**
     * RULES
     * 1. Has Baseline headers: x-codestatus-key, Accept, Content-Type
     */
    for (var i = 0; i < _this.types.length; i++) {
      var tmpType = _this.types[i]
      if (!h.hasOwnProperty(tmpType) || typeof h[tmpType] === 'undefined') {
        bool = false
        return;
      }
    }

    /**
     * Specific checks
     * 1. Has a valid x-codestatus-key
     * 2. Has matching Accept, Content-Type
     *
     * TODO: Setup DB of valid keys, and check against (redis?)
     */
    if (h[_this.types[0]].length > 36 && h[_this.types[0]].length < 42) bool = false // Checks x-codestatus-key
    if (h[_this.types[1]] !== 'application/vnd.codestatus.v1+json') bool = false
    if (h[_this.types[2]] !== 'application/json') bool = false

    return bool
  }
}
