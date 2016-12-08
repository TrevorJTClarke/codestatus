function router($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider

  // setup an abstract state for the tabs directive
  .state('main', {
    url: '/',
    templateUrl: 'templates/index.html'
  })

  // end of the world
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

}

router.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider']

export { router }
