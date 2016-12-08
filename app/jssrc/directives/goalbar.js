/**
 * goalbar
 * A directive for dynamic goalbars
 *
 * USE:
 * <goalbar data="data"></goalbar>
 *
 * Expected Data:
 * {
 * 	 "goalIncrement": 5953.0,
 * 	 "totalDonated": 400.0,
 * }
 */
import { Campaign } from '../utils';

module.exports = function ($rootScope, $timeout) {
  return {
    restrict: 'EA',
    scope: {
      data: '=',
      percent: '@?'
    },
    template: `
      <div class="goal-wrapper" ng-class="{ initial: data.totalDonated == 0 }">
        <div class="percentage" style="width:{{amount | number:0}}%"></div>
        <span>Be The First To Donate!</span>
      </div>
      <div class="goal-records" ng-if="data.totalDonated > 0">
        <strong>\${{data.totalDonated | number:0}}</strong> of \${{goalTotal | number:0}} goal
      </div>
    `,
    link: (scope) => {
      scope.goalTotal = 0
      let goalPercent
      let Cmpn = new Campaign()

      function setWidth(num) {
        scope.amount = num
      }

      let runUpdate = () => {
        if (!scope.data) {
          scope.data = {
            totalDonated: 0
          }
          return
        }

        goalPercent = Cmpn.getPercent(scope.data)
        scope.goalTotal = Cmpn.getTotal(scope.data)
        setWidth(goalPercent)

        // Immediate safe apply
        $timeout(() => {}, 1)
      }

      scope.$watch('data', runUpdate, false)

      // event listener for goalbar updating
      // TODO: setup for charityDonation once we have that type of widget available
      $rootScope.$on('ACTION:FIRE', function (e, args) {
        if (!args || args.type !== 'campaignDonation') return

        // check if this is the correct goalbar to update
        if (scope.data.id === args.data.id) {
          scope.data.totalDonated = args.data.totalDonated
          runUpdate()
        }
      })
    }
  }

}
