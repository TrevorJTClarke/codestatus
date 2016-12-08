// define all top level module controllers
// import { EventDetailCtrl } from './events/EventDetailCtrl'
import { MainCtrl } from '../MainCtrl'

// Initialize controllers
var Controllers = angular.module('admin.controllers', [])
  .controller('MainCtrl', ['$scope', '$timeout', ($scope, $timeout) => MainCtrl($scope, $timeout)])
  // .controller('EventDetailCtrl',
  //   ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', '$ionicLoading', '$ionicHistory', '$ionicViewSwitcher', '$ionicSlideBoxDelegate', '$ionicPopup', '$ionicActionSheet', 'Volunteer', 'System', 'Analytics', 'Events',
  //     ($rootScope, $scope, $state, $stateParams, $timeout, $ionicLoading, $ionicHistory, $ionicViewSwitcher, $ionicSlideBoxDelegate, $ionicPopup, $ionicActionSheet, Volunteer, System, Analytics, Events) =>
  //     EventDetailCtrl($rootScope, $scope, $state, $stateParams, $timeout, $ionicLoading, $ionicHistory, $ionicViewSwitcher, $ionicSlideBoxDelegate, $ionicPopup, $ionicActionSheet, Volunteer, System, Analytics, Events)])

;

export { Controllers }
