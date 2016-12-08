var Filters = angular.module('admin.filters', [])
  .filter('autoformat', require('./Autoformat'))
  .filter('elapsed', require('./Elapsed'))
  .filter('limitChars', require('./limitChars'))
  .filter('limitWords', require('./limitWords'))
  .filter('removeAt', require('./removeAt'))
;

export { Filters }
