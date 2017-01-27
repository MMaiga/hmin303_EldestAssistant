angular.module('app.eldestCtrl', [])


.controller('principalEldestCtrl', ['$scope', 'AuthService', 'API_ENDPOINT', '$http', '$state',function($scope, AuthService, API_ENDPOINT, $http, $state) {
  $scope.destroySession = function() {
    AuthService.logout();
  };

  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/person_eldest/memberinfo').then(function(result) {
      console.log('result '+ result);
      console.log('result.data '+ result.data);
      console.log('result.data.message '+ result.data.message);
      $scope.memberinfo = result.data.message;
    });
  };

  $scope.logout = function() {
    AuthService.logout();
    $state.go('menu.login');
  };
}])

.controller('AppCtrl', ['$scope', '$state', '$ionicPopup', 'AuthService', 'AUTH_EVENTS',function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('outside.login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });
}])

.controller('accueilCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])



.controller('manageResponsibleByEldestCtrl', ['$scope', 'AuthService', 'API_ENDPOINT', '$ionicPopup', '$state', '$http',function($scope, AuthService, API_ENDPOINT, $ionicPopup, $state, $http) {
  $scope.responsibleSearched = {
    phone: ''
  };
  $scope.memberinfo;
  $scope.responsibleFounded;


  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/person_eldest/memberinfo').then(function(result) {
      console.log('getInfo : result.data.success '+ result.data.success);
      console.log('getInfo : result.data.message '+ result.data.message);
      console.log('getInfo : result.data.user '+ result.data.user[0]);
      $scope.memberinfo = result.data.user[0];
      return result.data.message;
    });
  };



    $scope.getInfo();






  $scope.searchResponsible = function()
  {
    console.log("searchResponsible"+$scope.responsibleSearched.phone);

    $http.get(API_ENDPOINT.url + '/person_eldest/readResponsible?phone='+$scope.responsibleSearched.phone).then(function(result) {
      console.log('result '+ result);
      console.log('result.data '+ result.data);
      console.log('result.data.message '+ result.data.message);
      $scope.responsibleFounded = result.data.data[0];
      console.log('$scope.responsibleFounded  '+ $scope.responsibleFounded );

    var alertPopup = $ionicPopup.alert({
      title: 'searchResponsible',
      template: ' id : '+ $scope.responsibleFounded.id
      +' firstname : '+$scope.responsibleFounded.firstname
      +' lastname : '+$scope.responsibleFounded.lastname
      +' username : '+$scope.responsibleFounded.username
      +' birthdate : '+$scope.responsibleFounded.birthdate
      +' address : '+$scope.responsibleFounded.address
      +' mail : '+$scope.responsibleFounded.mail
      +' phone : '+$scope.responsibleFounded.phone
      +' role : '+$scope.responsibleFounded.role
      +' photo : '+ $scope.responsibleFounded.photo
      +' state : '+ $scope.responsibleFounded.state
    });
  });

  };





  $scope.addResponsible = function()
  {
    console.log("addResponsible"+$scope.responsibleFounded.id);

    $http.get(API_ENDPOINT.url + '/person_eldest/responsibleAddResponsible?idResponsible='+$scope.responsibleFounded.id+"&idResponsible="+$scope.memberinfo.id).then(function(result) {
      console.log('result '+ result);
      console.log('result.data '+ result.data)
      console.log('result.data.success '+ result.data.success);
      console.log('result.data.message '+ result.data.message);


      if (result.data.success) {

          var alertPopup = $ionicPopup.alert({
            title: 'addResponsible success!',
            template: "Vous êtes maintenant responsable de "+$scope.responsibleFounded.lastname + " " +$scope.responsibleFounded.firstname
          });


      } else
      {

        var alertPopup = $ionicPopup.alert({
            title: 'addResponsible failed!',
            template: "Vous êtes déja responsable de "+$scope.responsibleFounded.lastname  + " " +$scope.responsibleFounded.firstname
          });
        }

    });




  };

  $scope.removeResponsible = function()
  {

  };

  $scope.acceptResponsible = function()
  {

  };


  $scope.destroySession = function() {
    AuthService.logout();
  };



  $scope.getResponsible = function() {
    $http.get(API_ENDPOINT.url + '/person_eldest/memberinfo').then(function(result) {
      console.log('result.data.message '+ result.data.message);
      $scope.memberinfo = result.data.message;
    });
  };

  $scope.logout = function() {
    AuthService.logout();
    $state.go('menu.login');
  };





}])
