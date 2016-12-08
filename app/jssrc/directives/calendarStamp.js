import { Helpers } from './../utils/helpers.js';

/**
 * Calendar Stamp
 * A module for displaying a calendar timestamp in a simple elegant way, none of this shabby chic #SyntacticalSugar
 *
 * USE:
 * <calendar-stamp data='ISO 8601 Timestamp'></calendar-stamp>
 * OR:
 * let calendarStamp = require('./calendarStamp')
 * ${calendarStamp(timestamp)}
 *
 * Expected Data:
 * '2015-12-22T18:02:12.405Z'
 */
export default function calendarStamp(timestamp) {
  const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  let ts = (timestamp) ? Helpers().formatSafariTimestamp(timestamp) : timestamp
  let t = new Date(ts)
  let month = m[t.getMonth()]
  let day = t.getDate()

  // get rid of dem ugries
  month = (month !== undefined) ? month : ''
  day = (isNaN(day)) ? '' : day

  return `
  <calendar-stamp>
    <small>${month}</small>
    <title>${day}</title>
  </calendar-stamp>
  `
};
