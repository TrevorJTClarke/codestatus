import { API } from './Api';
import { Helpers } from './Helpers';
import { System } from './System';

var Utils = angular.module('admin.utils', [])
  .factory('API', API)
  .factory('Cookie', () => new Cookie())
  .factory('System', () => System())
  ;

export {
  Utils,
  API,
  Helpers,
  System
}
