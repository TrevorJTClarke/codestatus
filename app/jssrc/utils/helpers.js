/*
 * Helpers
 * A set of helpful little functions
 **/

function Helpers() {

  return {

    formatSafariTimestamp: function (timestamp) {
      if (!timestamp || typeof timestamp !== 'string') return timestamp
      if (timestamp.search('Z') > -1) {
        // example: "2016-09-10T17:00:00.000Z"
        // REF: http://stackoverflow.com/questions/6427204/date-parsing-in-javascript-is-different-between-safari-and-chrome
        // OLD WAY!! return timestamp.replace(/ UTC|Z/g, '').replace(/\.(.*)(0){3}/g, '').replace(/T/g, ',').replace(/-/g, '/')
        // let a = timestamp.split(/[^0-9]/)

        // create date with: year, month [, date [, hours [, minutes [, seconds [, ms ] ] ] ] ]
        // return new Date (a[0], a[1]-1, a[2], a[3], a[4], a[5], a[6] || 0)
        return timestamp
      } else if (timestamp.length > 27) {
        // example: "2016-11-01T09:00:00.000-07:00"
        return timestamp //.replace(/\.(.*)(0){3}-/g, '+').replace(/T/g, ',').replace(/-/g, '/')
      } else {
        return timestamp //.replace(/ UTC/g, '').replace(/T/g, ',').replace(/-/g, '/')
      }
    },

    getDaysFromTimestamp: function (start) {
      // check to make sure it hasn't passed
      let ts = (start) ? this.formatSafariTimestamp(start) : ''
      if ((+new Date()) > (+new Date(ts))) return 0;

      // do the actual maths
      let s = new Date(ts)
      let n = new Date()
      let t = Math.abs(s.getTime() - n.getTime())
      return Math.ceil(t / (1000 * 3600 * 24))
    },

    getLongformTime: function (timestamp) {
      const m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const d = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      let ts = (timestamp) ? this.formatSafariTimestamp(timestamp) : timestamp
      let t = new Date(ts)
      let month = m[t.getMonth()]
      let date = t.getDate()
      let day = d[t.getDay()]
      let hours = t.getHours()
      let hour = (hours > 12) ? hours - 12 : hours
      let ampm = (hours > 12) ? 'pm' : 'am'
      let verb = nth(date)

      function nth(d) {
        if (d > 3 && d < 21) return 'th'

        switch (d % 10) {
          case 1:  return 'st'
          case 2:  return 'nd'
          case 3:  return 'rd'
          default: return 'th'
        }
      }

      return `${day}, ${month} ${date}${verb} at ${hour}${ampm}`
    }

  }
}

export {
  Helpers
}
