import { Helpers } from './utils'

/**
 * GLOBAL Controller
 */
function MainCtrl($scope, $timeout) {
  // let H = new Helpers()

  $scope.data = []

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBjuO0qn4j5BIh71plMKPMOXeIHCZEwXUc",
    authDomain: "codestatus-c51cb.firebaseapp.com",
    databaseURL: "https://codestatus-c51cb.firebaseio.com",
    storageBucket: "codestatus-c51cb.appspot.com",
    messagingSenderId: "181627470495"
  }
  firebase.initializeApp(config)

  var DB = firebase.database();
  var dataRef = DB.ref('dHJldm9ycm9ja3NhdHN0dWZmc29tZXRpbWVz');
  dataRef.on('value', function(res) {
    var data = res.val()
    var formattedData = Helpers().formatData(data)
    $scope.data = formattedData
    $timeout(() => {}, 10)
  });
}

MainCtrl.$inject = ['$scope', '$timeout']

export { MainCtrl }
