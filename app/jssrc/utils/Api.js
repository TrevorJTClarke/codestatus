/**
 * API
 *
 * Setup an easy way of getting API routes, cuz writing API strings is stupid and unmanageable
 *
 * EXAMPLES:
 * API.users() -> "/users"
 * API.users( id ) -> "/users/548902fjdsljkfsa0f089r3hfdjsalfj"
 *
 * TODO: This could use some heavy improvements :/
 *
 */

class API {

  constructor() {
    // default Config BASE route
    this.ROUTEBASE = ''// Config.API.HOST;

    // default variable defines
    this.apiString = ''
  }

  getString () {
    return this.apiString
  }

  route () {
    let _result = this.getString().replace(/[?]/g, '&').replace('&', '?').replace('//', '/')
    this.apiString = ''
    return this.ROUTEBASE + _result
  }

  sort (string) {
    string = (string) ? '?sort=' + string : '&sort=id&direction=desc'
    this.apiString = this.getString() + string
    return this
  }

  featured (string) {
    string = string || ''
    this.apiString = this.getString() + '?featured=' + string
    return this
  }

  direction (string) {
    string = string || ''
    this.apiString = this.getString() + '?direction=' + string
    return this
  }

  /**
   * list()
   * sets up limit/offset query string params
   */
  list (limit, offset) {
    var listString = ''
    if (offset !== undefined) {
      listString += this.limit(limit) + this.offset(offset)
    } else {
      listString += this.limit(limit)
    }

    this.apiString = this.getString() + listString
    return this
  }

  limit (length) {
    length = length || 0
    return '?limit=' + length
  }

  offset (count) {
    count = count || 0
    return '&offset=' + count
  }

  /**
   * dateRange()
   * sets up start/end query string params
   */
  dateRange (start, end) {
    var dateString = ''

    if (end !== undefined) {
      dateString += this.startDate(start) + this.endDate(end)
    } else {
      dateString += this.startDate(start)
    }

    this.apiString = this.getString() + dateString

    return this
  }

  startDate (date) {
    date = date || ''
    return (!date) ? '' : '?startAtGte=' + date
  }

  endDate (date) {
    date = date || ''
    return (!date) ? '' : '&startAtLte=' + date
  }

  // dynamic route ends
  base (string) {
    return this.ROUTEBASE + `${string ? '/' + string : ''}`
  }

  users (id) {
    this.apiString += `/users${id ? '/' + id : ''}`
    return this
  }

  causes (id) {
    this.apiString += `/causes${id ? '/' + id : ''}`
    return this
  }

  campaigns (id) {
    this.apiString += `/campaigns${id ? '/' + id : ''}`
    return this
  }

  charities (id) {
    this.apiString += `/charities${id ? '/' + id : ''}`
    return this
  }

  events (id) {
    this.apiString += `/events${id ? '/' + id : ''}`
    return this
  }

  groups (id) {
    this.apiString += `/groups${id ? '/' + id : ''}`
    return this
  }

  organizations (id) {
    this.apiString += `/organizations${id ? '/' + id : ''}`
    return this
  }

  products (id) {
    this.apiString += `/products${id ? '/' + id : ''}`
    return this
  }

  notifications (id) {
    this.apiString += `/notifications${id ? '/' + id : ''}`
    return this
  }

  system (id) {
    this.apiString += `/system-messages${id ? '/' + id : ''}`
    return this
  }

  // static route ends (IE: boring routes)
  login () {
    return this.ROUTEBASE + '/login'
  }

  logout () {
    return this.ROUTEBASE + '/logout'
  }

  extend (string) {
    this.apiString += string
    return this
  }

  activity () {
    this.apiString += '/activity'
    return this
  }

  comments () {
    this.apiString += '/comments'
    return this
  }

  feed () {
    this.apiString += '/feed'
    return this
  }

  impact () {
    this.apiString += '/impact'
    return this
  }

  summary () {
    this.apiString += '/summary'
    return this
  }

  donations () {
    this.apiString += '/donations'
    return this
  }

  overview () {
    this.apiString += '/overview'
    return this
  }

}

export { API }
