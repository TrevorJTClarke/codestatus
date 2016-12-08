/**
 * time
 * A directive for assumptions on how long ago something occurred, when in fact time is all relative, and should be subject to revisiting; #timetravel
 *
 * USE:
 * <time stamp="{{data.timestamp}}"></time>
 * <time stamp="data.timestamp" no-clock></time>
 *
 * Options:
 * - no-clock - hides the clock icon
 *
 * Expected Data:
 * '2015-12-22T18:02:12.405Z'
 */
module.exports = function () {

  let clock = `
        <svg id="timeclock" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
          <path d="M256,48C141.1,48,48,141.1,48,256s93.1,208,208,208c114.9,0,208-93.1,208-208S370.9,48,256,48z M273,273H160v-17h96V128h17 V273z"/>
        </svg>`

  return {
    restrict: 'EA',
    scope: {
      stamp: '='
    },
    template: `${clock}<small>{{stamp | elapsed}}</small>`,
    link: function (scope, elem, attrs) {
      // quick data check
      if (typeof scope.stamp === undefined) {
        // reset the state and show nuthin
        elem.hide()
        return
      }

      // remove clock if option occurs
      if (attrs.noClock !== undefined) {
        elem.addClass('no-clock')
      }

    }
  }
};
