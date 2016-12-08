import { Helpers, Timezones } from './../utils';
let Time = new Timezones

/**
 * time-long
 * A module for displaying time in a verbose manner
 *
 * USE:
 * <time-long data='ISO 8601 Timestamp'></time-long>
 * <time-long data='ISO 8601 Timestamp' icon='true'></time-long>
 * OR:
 * let timeLong = require('./timeLong')
 * ${timeLong(options Object)}
 *
 * Required Data:
 * startAt '2015-12-22T18:02:12.405Z'
 *
 * Options Object:
 * - startAt: ISO 8601 Timestamp
 * - endAt: ISO 8601 Timestamp
 * - icon: Boolean - show/hide the calendar icon (default true)
 * - timezone: 0500 - hours offset from UTC origin
 * - notDsPadded: Boolean - if we account for DAYLIGHT Savings or not
 * - long: Boolean - if we want the most verbosity ever!!
 *
 * Example Output:
 * Friday, Sept. 9th at 4:00pm to 6:00pm (PT)
 * Friday, Sept. 9th at 4:00pm (PT)
 * Sept. 9th to Oct.10th
 * Sept. 9th at 8am to Oct. 10th at 9pm (PT)
 */
export default function timeLong(options) {
  const mFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const m = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']
  const d = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let icon = (typeof options.icon !== 'undefined') ? options.icon : true
  let long = (typeof options.long !== 'undefined') ? options.long : false
  let title = ''
  let tmz = null
  let calendar = `
    <svg version="1.1" id="calendar" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 390.5 386.5" enable-background="new 0 0 390.5 386.5" xml:space="preserve">
      <polygon points="376,42 286,42 286,87 271,87 271,42 121,42 121,87 106,87 106,42 16,42 16,117 376,117 "/>
      <rect x="106" y="12" width="15" height="30"/>
      <rect x="271" y="12" width="15" height="30"/>
      <path d="M16,132v240h360V132H16z M357,352H34.5V150H357V352z"/>
    </svg>`

  if (options.startAt) {
    // NOTE: Check for DAYLIGHT SAVINGS!!!! ughhhhh, stopit.. (happens in method)
    tmz = (!options.notDsPadded) ? Time.getByOffsetDSAdjusted(options.timezone).abbr : Time.getByOffset(options.timezone).abbr
  }

  function nth(d) {
    if (d > 3 && d < 21) return 'th'

    switch (d % 10) {
      case 1:  return 'st'
      case 2:  return 'nd'
      case 3:  return 'rd'
      default: return 'th'
    }
  }

  function isSameDay(a, b) {
    let aa = new Date(a)
    let bb = new Date(b)

    return (aa.getDay() === bb.getDay() && aa.getDate() === bb.getDate())
  }

  function getTimeString(ts) {
    let t = new Date(ts)
    let month = m[t.getMonth()]
    let monthFull = mFull[t.getMonth()]
    let date = t.getDate()
    let day = d[t.getDay()]
    let hours = t.getHours()
    let mins = t.getMinutes() + ''
    let hour = (hours > 12) ? hours - 12 : hours
    let ampm = (hours > 12) ? 'pm' : 'am'
    let verb = nth(date)
    let sDate = (date < 10) ? '0' + date : date
    let sMon = t.getMonth() + 1
    let sYear = t.getFullYear() + ''
    sYear = sYear.substring(2, 4)

    if (mins && mins.length <= 1) mins = '0' + mins

    return { ampm, date, day, hour, mins, month, verb, stamp: `${sMon}/${sDate}/${sYear}` }
  }

  let start = (options.startAt) ? getTimeString(options.startAt) : {}
  let end = (options.endAt) ? getTimeString(options.endAt) : {}
  let singleDay = (options.startAt && options.endAt) ? isSameDay(options.startAt, options.endAt) : true

  // Logic Formatting:
  // 1. Multiple day Short
  // 2. Single Day Short
  // 3. Multiple day Long
  // 4. Single Day Long
  if (!long) {
    if (!singleDay) {
      // Sept 9th to Oct. 10th
      title = `<title>${start.month} ${start.date}${start.verb} to ${end.month} ${end.date}${end.verb}</title>`
    } else {
      // Friday, Sept 9th at 4:00pm (PT)
      title = `<title>${start.day}, ${start.month} ${start.date}${start.verb} at ${start.hour}${(start.mins && start.mins !== '00') ? ':' + start.mins : ''}${start.ampm}${(tmz) ? ' (' + tmz + ')' : ''}</title>`
    }
  } else {
    if (!singleDay) {
      // Sept. 9th at 8am to Oct. 10th at 9pm (PT)
      title = `<div class="title">
        <span>${start.month} ${start.date}${start.verb} to ${end.month} ${end.date}${end.verb}<span>
        <small>${start.stamp} ${start.hour}${(start.mins && start.mins !== '00') ? ':' + start.mins : ''}${start.ampm} to ${end.stamp} ${end.hour}${(end.mins && end.mins !== '00') ? ':' + end.mins : ''}${end.ampm} ${(tmz) ? ' (' + tmz + ')' : ''}</small>
      </div>
      `
    } else {
      // Friday Sept. 9th at 4:00pm to 6:00pm (PT)
      title = `<title>
                ${start.day}, ${start.month} ${start.date}${start.verb} - ${start.hour}${(start.mins && start.mins !== '00') ? ':' + start.mins : ''}${start.ampm}
                to ${end.hour}${(end.mins && end.mins !== '00') ? ':' + end.mins : ''}${end.ampm}
                ${(tmz) ? ' (' + tmz + ')' : ''}
               </title>`
    }
  }

  return `
  <time-long>
    ${(icon) ? calendar : ''}
    ${title}
  </time-long>
  `
};
