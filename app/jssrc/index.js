// Import all App initializers
import 'babel-polyfill'
import { Utils } from './utils'
import { Init, InitConfig } from './init'
import { Controllers } from './modules/index'
import { Directives } from './directives/index'
import { Filters } from './filters/index'
// import { router } from './router'

// Only Place high level module dependencies here
var A = angular.module('app', [
  Controllers.name,
  Directives.name,
  Filters.name,
  Utils.name
])
.config(InitConfig)
// .config(router)
.run(Init);
