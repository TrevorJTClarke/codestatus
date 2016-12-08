/**
 * alerts
 * A directive for assumptions on how long ago something occurred, when in fact time is all relative, and should be subject to revisiting; #timetravel
 *
 * USE:
 * <alerts></alerts>
 *
 * Methods:
 * $rootScope.$emit("ALERT:SHOW", DATA_OBJECT)
 * $rootScope.$emit("ALERT:HIDE", () => {})
 *
 * Options:
 * - action - next, close
 * - duration - 5000 Default, in milliseconds
 * - icon - SEE REF: http://ionicons.com/ anything is possible :) NOTE: remove 'ion-'
 * - scheme - info, warn, success, error
 * - title - Any String
 * - message - Any String
 * - callback - Any Function
 *
 * Expected Data:
 * {
 * 	action: 'next',
 * 	icon: 'happy',
 * 	duration: 8000,
 * 	scheme: 'warn',
 * 	title: 'Error Somewhere',
 * 	message: 'This is just terrible!',
 * 	callback: (e, args) => { console.log('test! args:',args) }
 * }
 *
 */
module.exports = function ($rootScope, $timeout) {
  return {
    restrict: 'EA',
    template: `
      <div class="alert-icon" ng-if="alertData.icon">
        <i ng-if="alertData.icon" class="icon ion-{{alertData.icon}}"></i>
      </div>
      <div class="alert-msg">
        <h3>{{alertData.title}}</h3>
        <p>{{alertData.msg}}</p>
      </div>
      <div class="alert-action" ng-if="alertData.action" ng-click="alertData.callback()">
        <i ng-if="alertData.action == \'next\'" class="icon ion-arrow-right-c"></i>
        <i ng-if="alertData.action == \'close\'" class="icon ion-close-round"></i>
      </div>
    `,
    link: (scope, elem) => {
      let activeTimer
      let activeClass = 'alert-active'
      scope.duration = 5000
      scope.alertData = {
        icon: null,
        title: null,
        msg: null,
        action: null,
        callback: null
      }

      function setScheme(scheme) {
        elem.removeClass('success')
        elem.removeClass('error')
        elem.removeClass('info')
        elem.removeClass('warn')
        if (!scheme) return;

        elem.addClass(scheme)
      }

      function show(e, args) {
        if (!args) return;
        scope.duration = args.duration || 5000
        scope.alertData.icon = args.icon || 'information-circled'
        scope.alertData.title = args.title || args.type || ''
        scope.alertData.msg = args.message || ''
        scope.alertData.action = args.action || null
        setScheme(args.scheme || args.type)

        scope.alertData.callback = () => {
          // TODO: Investigate this for potential scariness
          // if (args.callback) $timeout(args.callback, 280)
          elem.removeClass(activeClass)
        }

        $timeout(()=> {}, 1)
        elem.addClass(activeClass)

        $timeout.cancel(activeTimer)
        activeTimer = $timeout(() => {
          elem.removeClass(activeClass)
        }, scope.duration)
      }

      // Alert Listeners
      // $rootScope.$on('SYSTEMMESSAGE:FIRE', show) // AH says not yet :)
      $rootScope.$on('ALERT:SHOW', show)
      $rootScope.$on('ALERT:HIDE', () => {
        $timeout.cancel(activeTimer)
        elem.removeClass(activeClass)
      })
    }
  }
};
