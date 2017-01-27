angular.module('app.prescriptionCtrl', [])

.controller('prescriptionCtrl', ['$scope', 'AuthService', 'API_ENDPOINT', '$ionicPopup', '$state', '$http',
function($scope, AuthService, API_ENDPOINT, $ionicPopup, $state, $http) {

  $scope.getPrescription = function() {
    $http.get('http://ouwasav.com:4000/api' + '/prescription').then(function(result) {
      console.log('result.data.message '+ result.data.message);
      for (var i = 0; i < result.data.data.length; i++) {
    // Iterate over numeric indexes from 0 to 5, as everyone expects.
    console.log(result.data.data[i]);
}
      $scope.prescriptions = result.data.data;
    });
  };

}])
