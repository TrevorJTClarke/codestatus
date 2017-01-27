/**
 * Header Handler and Auth
 */
module.exports = {

  // catalog of valid header types
  types: ['type', 'version', 'message'],

  // Checks all keys and makes sure they are valid!
  isValid: function (h) {
    var bool = true
    var _this = this

    /**
     * RULES
     * 1. Has Baseline headers: x-codestatus-key, Accept, Content-Type
     */
    for (var i = 0; i < _this.types.length; i++) {
      var tmpType = _this.types[i]
      if (!h.hasOwnProperty(tmpType) || typeof h[tmpType] === 'undefined' || (typeof h[tmpType] !== 'string' && tmpType !== 'meta')) {
        bool = false
        return;
      }
    }

    return bool
  },

  // formats the body and rejects all extra data
  format: function (b) {
    var final = {
      message: b.message || '',
      timestamp: (b.timestamp) ? (+new Date(b.timestamp)) : (+new Date),
      type: b.type || 'deploy',
      version: b.version || ''
    }

    // extra, not necessary data
    if (b.channel) final.channel = b.channel
    if (b.device) final.device = b.device
    if (b.meta) final.meta = b.meta
    if (b.platform) final.platform = b.platform
    if (b.status) final.status = b.status

    return final
  }
}
