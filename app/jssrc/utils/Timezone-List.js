/**
 * Timezone List
 * A simple value store of timezones and strings
 */
const TimezoneCatelog = {
  selectable: ['1000', '0900', '0800', '0700', '0600', '0500'],
  '1000': {
    abbr: 'HI',
    name: 'Hawaii',
    label: 'Hawaii (HI)',
    utc: '10:00'
  },
  '0900': {
    abbr: 'AK',
    name: 'Alaska',
    label: 'Alaska (AK)',
    utc: '09:00'
  },
  '0800': {
    abbr: 'PT',
    name: 'Pacific Time (US & Canada)',
    label: 'Pacific Time (PT)',
    utc: '08:00'
  },
  '0700': {
    abbr: 'MT',
    name: 'Mountain Time (US & Canada)',
    label: 'Mountain Time (MT)',
    utc: '07:00'
  },
  '0600': {
    abbr: 'CT',
    name: 'Central Time (US & Canada)',
    label: 'Central Time (CT)',
    utc: '06:00'
  },
  '0500': {
    abbr: 'ET',
    name: 'Eastern Time (US & Canada)',
    label: 'Eastern Time (ET)',
    utc: '05:00'
  },
  10: 'Hawaii',
  9: 'Alaska',
  8: 'Pacific Time (US & Canada)',
  7: 'Mountain Time (US & Canada)',
  6: 'Central Time (US & Canada)',
  5: 'Eastern Time (US & Canada)',
  Hawaii: 10,
  Alaska: 9,
  'Pacific Time (US & Canada)': 8,
  'Mountain Time (US & Canada)': 7,
  'Central Time (US & Canada)': 6,
  'Eastern Time (US & Canada)': 5
}

/**
 * Timezones
 * Simple methods for timezone usage
 */
export class Timezones {

  // find out if we're on daylight savings time or not
  isDaylightSavings () {
    Date.prototype.stdTimezoneOffset = function() {
      var jan = new Date(this.getFullYear(), 0, 1)
      var jul = new Date(this.getFullYear(), 6, 1)
      return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
    }

    Date.prototype.dst = function() {
      return this.getTimezoneOffset() < this.stdTimezoneOffset()
    }

    let today = new Date()
    return (today.dst())
  }

  // returns formatted array of timezones for UI use
  getSelectable () {
    let fin = []
    let arr = TimezoneCatelog.selectable

    for (var i = 0; i < arr.length; i++) {
      fin.push({
        offset: arr[i],
        label: TimezoneCatelog[arr[i]].label,
        value: TimezoneCatelog[arr[i]].name
      })
    }

    return fin
  }

  // returns the users active timezone
  getDefaultTimezone () {
    let d = new Date()
    let hours = this.getHoursFromUTCDate(d)
    let timezone
    let offset
    let selectables = TimezoneCatelog.selectable

    for (var i = 0; i < selectables.length; i++) {
      if (selectables[i].search(hours + '') > -1) {
        offset = selectables[i]
        timezone = TimezoneCatelog[selectables[i]]
        break;
      }
    }

    return {
      offset,
      label: timezone.label,
      value: timezone.name,
      name: timezone.name
    }
  }

  // returns an object of timezone info
  getByOffset (offset) {
    let fixed = (offset.length > 4) ? offset.substring(1,5) : offset
    return TimezoneCatelog[fixed]
  }

  // returns an object of timezone info, daylight savings in mind
  getByOffsetDSAdjusted (offset) {
    let isDs = this.isDaylightSavings()
    let fixed = (offset.length > 4) ? offset.substring(1,5) : offset

    if (isDs) {
      let h = parseInt(fixed, 10) + 100 // Add 100 or 1 hour to the offset for daylight savings

      fixed = '0' + h
    }

    return TimezoneCatelog[fixed]
  }

  // returns the hour integer for given timezone string
  getByName (name) {
    return TimezoneCatelog[name]
  }

  // returns the hour integer for given timezone string
  getHoursDSAdjusted (hours) {
    let isDs = this.isDaylightSavings()
    let hour = hours.replace(':', '')
    let h

    if (isDs) {
      h = parseInt(hour, 10) + 100 // Add 100 or 1 hour to the offset for daylight savings
    }

    return (isDs) ? '0' + h : hour
  }

  getHoursFromUTCDate (date) {
    let addOne = this.isDaylightSavings()
    let hours = Math.round(date.getTimezoneOffset() / 60)
    return (addOne) ? hours + 1 : hours
  }

  // pass in current date, then convert to UTC from time offset
  getLocalTimezoneFromDate (date) {
    let h = this.getHoursFromUTCDate(date)
    return TimezoneCatelog[h]
  }

  getTimeRelativeOffset (timedate, offset) {
    let ts = new Date(timedate)
    let tsHours = ts.getHours()
    let myDate = new Date() + ''
    let isDs = this.isDaylightSavings()
    let myOffsetTime = Math.abs(parseInt(myDate.substring(29,33), 10) / 100) // Example: 7 - PT
    let offsetTime = TimezoneCatelog[offset] // Example: 5 - CT
    if (isDs) myOffsetTime = myOffsetTime + 1

    // quick check if its the same offset
    if (myOffsetTime === offsetTime) return ts

    // We need to change hours based on the relative difference
    let fixedOffset = (myOffsetTime > offsetTime) ? tsHours - (myOffsetTime - offsetTime) : tsHours + (offsetTime - myOffsetTime)
    let readyTime = ts.setHours(fixedOffset)

    // Alllllllll good now!
    return new Date(readyTime)
  }

  getTimeAbsoluteOffset (timedate, offset) {
    let baseTime = new Date(timedate)
    let baseTimeHours = baseTime.getHours()
    let offsetTime = Math.abs(parseInt(offset, 10) / 100)
    let myDate = new Date() + ''
    let myOffset = myDate.substring(29,33)
    let myOffsetFixed = Math.abs(parseInt(myOffset, 10) / 100)
    let readyOffset = baseTimeHours + (myOffsetFixed - offsetTime)
    let offsetNewTime = baseTime.setHours(readyOffset)
    return new Date(offsetNewTime)
  }


}
