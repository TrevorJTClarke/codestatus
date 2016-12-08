/**
 * elapsed
 * A filter for giving timestamps context
 *
 * USE:
 * {{timestamp | elapsed}}
 */
module.exports = function () {
  return function (datetime) {
    let days
    let difference_ms
    let hours
    let minutes
    let now
    let weeks
    let months

    now = new Date();
    now = now.getTime();
    datetime = new Date(datetime).getTime();
    difference_ms = now - datetime;
    difference_ms = difference_ms / 1000;
    difference_ms = difference_ms / 60;
    minutes = Math.ceil(difference_ms % 60);
    difference_ms = difference_ms / 60;
    hours = Math.floor(difference_ms % 24);
    days = Math.floor(difference_ms / 24);
    weeks = Math.floor(days / 7);
    months = Math.floor(days / 30);

    if (months > 0) {
      return `${months === 1 ? 'last month' : months + ' months ago'}`
    } else if (weeks > 0) {
      return `${weeks === 1 ? 'last week' : weeks + ' weeks ago'}`
    } else if (days > 0) {
      return `${days === 1 ? 'yesterday' : days + ' days ago'}`
    } else if (hours > 0) {
      return `${hours === 1 ? 'An hour ago' : hours + ' hours ago'}`
    } else if (minutes > 0) {
      return `${minutes === 1 ? 'A minute ago' : minutes + ' minutes ago'}`
    } else {
      return `A minute ago`
    }
  }
};
