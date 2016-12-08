var Directives = angular.module('admin.directives', [])
  .directive('alerts', require('./alerts'))
  .directive('avatar', require('./avatar'))
  .directive('background', require('./background'))
  .directive('goalbar', require('./goalbar'))
  .directive('time', require('./time'))
;

export { Directives }
