import { API } from './Api';
import { Helpers } from './Helpers';
import { System } from './System';
import { Timezones } from './Timezone-List';

var Utils = angular.module('admin.utils', [])
  .factory('API', API)
  .factory('Cookie', () => new Cookie())
  .factory('System', ['$rootScope', '$http', '$q', ($rootScope, $http, $q) => System($rootScope, $http, $q)])
  ;

export {
  Utils,
  API,
  Helpers,
  System,
  Timezones
}
