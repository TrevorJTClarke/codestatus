/**
 * Cookie
 * A simple document cookie service, since ngCookies cannot handle expire settings
 *
 * NOTE: Removed real cookie logic since cordova does not support cookies!!! AHHHHHH
 */
export class Cookie {

  constructor () {
    this.clearables = ['ct-user', 'ct-push', 'ct-bdg', 'token', 'tokents']
  }

  /**
   * returns the cookie based on key
   */
  get (key) {
    return localStorage.getItem(key)
  }

  /**
   * returns the cookie based on key
   */
  set (key, value) {
    localStorage.setItem(key, value)
  }

  /**
   * clears all cookies, or just a cookie by key
   */
  clearAll (key) {
    if (key) {
      localStorage.removeItem(key)
    } else {
      for (var i = 0; i < this.clearables.length; i++) {
        localStorage.removeItem(this.clearables[i])
      }
    }
  }

}
