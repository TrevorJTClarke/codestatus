/**
 * GLOBAL Controller
 */
function MainCtrl($scope, $timeout) {

  $scope.data = [{
    name: 'cocheezits',
    envs: [{
      name: 'dev',
      devices: [{
        name: 'mobile',
        channel: 'dev',
        message: 'built for dev cocheezits',
        timestamp: '11/21/2016-15:35:39',
        version: '1.3.15'
      }]
    }, {
      name: 'staging',
      devices: [{
        name: 'mobile',
        channel: "staging",
        message: "updated web switch theme, updated CoCheezits configs",
        timestamp: "11/18/2016-13:35:15",
        version: "1.3.12"
      }]
    }, {
      name: 'test',
      devices: [{
        name: 'mobile',
        channel: "dev",
        message: "diagnostics for CTDEV-3090, [test,cocheezits]",
        timestamp: "11/22/2016, 4:58:46 PM",
        version: "1.3.16"
      }]
    }, {
      name: 'production',
      devices: [{
        name: 'mobile',
        channel: "production",
        message: "Fixed CoCheezits production config",
        timestamp: "11/18/2016-13:44:34",
        version: "1.3.14"
      }]
    }]
  }, {
    name: 'cotribute',
    envs: [{
      name: 'dev',
      devices: [{
        name: 'mobile',
        message: "built out final package related theme changes CTDEV-2881",
        timestamp: "10/13/2016-15:33:01",
        version: "0.0.1"
      }]
    }, {
      name: 'test',
      devices: [{
        name: 'mobile',
        message: "testing new method for getting staged builds to work [test,cotribute]",
        timestamp: "11/11/2016-00:59:00",
        version: "1.9.6"
      }]
    }]
  }, {
    name: 'copreview',
    envs: [{
      name: 'dev',
      devices: [{
        name: 'mobile',
        channel: "dev",
        message: "Fixed CoCheezits production config",
        timestamp: "11/18/2016-13:51:21",
        version: "1.0.2"
      }]
    }, {
      name: 'staging',
      devices: [{
        name: 'mobile',
        channel: "staging",
        message: "Build for copreview",
        timestamp: "11/18/2016-13:53:55",
        version: "1.0.3"
      }]
    }, {
      name: 'production',
      devices: [{
        name: 'mobile',
        channel: "production",
        message: "Build for copreview",
        timestamp: "11/18/2016-14:00:12",
        version: "1.0.4"
      }]
    }]
  }, {
    name: 'thrivent',
    envs: [{
      name: 'dev',
      devices: [{
        name: 'mobile',
        channel: "dev",
        message: "built for thrivent production, v1.0.12",
        timestamp: "11/09/2016-12:01:23",
        version: "1.0.12"
      }]
    }, {
      name: 'production',
      devices: [{
        name: 'mobile',
        channel: "production",
        message: "built for thrivent production",
        timestamp: "11/09/2016-13:46:00",
        version: "1.0.13"
      }, {
        name: 'website',
        message: "built for thrivent production",
        timestamp: "11/04/2016-12:13:26",
        version: "1.9.2"
      }]
    }, {
      name: 'staging',
      devices: [{
        name: 'website',
        message: "testing other env setups [staging,thrivent] CTDEV-2842",
        timestamp: "11/10/2016-10:13:46",
        version: "1.9.4"
      }]
    }, {
      name: 'test',
      devices: [{
        name: 'website',
        message: "readme update, testing deploy pipeline [test,thrivent]",
        timestamp: "11/10/2016-22:54:48",
        version: "1.9.5"
      }]
    }]
  }];


}

MainCtrl.$inject = ['$scope', '$timeout']

export { MainCtrl }
