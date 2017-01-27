angular.module('app.personCtrl', ['ngSanitize'])

.controller('LoginCtrl', ['$scope', 'AuthService', 'API_ENDPOINT', '$ionicPopup', '$state', '$http',function($scope, AuthService, API_ENDPOINT, $ionicPopup, $state, $http) {
  $scope.user = {
    phone: '',
    password: ''
  };

  $scope.login = function() {
    console.log(API_ENDPOINT.url + '/person/login');
    console.log('/person/login');
    console.log(API_ENDPOINT.url);
      $http.post(API_ENDPOINT.url + '/person/login', $scope.user).then(function(result) {
        if (result.data.success) {
          if(result.data.result.length>0){
            console.log('result.data.token ='+result.data.token);
            AuthService.storeUserCredentials(result.data.token);
            console.log(result.data.result[0].role);
            var role = parseInt(result.data.result[0].role);
            if(role==0){
              $state.go('principalResponsible');
            }
            else
              if(role==1){
              $state.go('principalEldest');
            }
          }
          else{
            var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: "Ce compte n'existe pas!!"
            });
          }

        } else {
            var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: result.data.message
            });
        }
      });

    /*AuthService.login($scope.user).then(function(result) {
      console.log(result);
      $state.go('principalEldest');

    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });*/
  };
}])

/*.controller('RegisterCtrl', ['$scope', 'AuthService', '$ionicPopup', '$state',function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    phone: '',
    password: ''
  };

  $scope.signup = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('outside.login');
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg
      });
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg
      });
    });
  };
}])*/

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

.controller('accueilCtrl', ['$scope', '$sce',
function ($scope, $sce) {

  $scope.slider = `<ion-slides disable-side-menu-drag="" options="{'loop': true}" slider="slider4" delegate-handle="slider4" id="accueil-slider4" >
      <ion-slide-page id="accueil-slide27" style="background:url(&quot;img/EldestAssistant1_slider.png&quot;) no-repeat center;background-size:cover;"></ion-slide-page>
      <ion-slide-page id="accueil-slide28" style="background:url(&quot;img/EldestAssistant1_slider.png&quot;) no-repeat center;background-size:cover;"></ion-slide-page>
    </ion-slides>`;

    $scope.htmlSlider = $sce.trustAsHtml($scope.slider.text);


}])

/*.controller('lOGINCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])*/

.controller('menuCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])

.controller('sIGNUPCtrl', ['$scope', 'AuthService', 'API_ENDPOINT', '$http', '$ionicPopup', '$state',function($scope, AuthService, API_ENDPOINT, $http, $ionicPopup, $state) {
$scope.user = {
    firstname: '',
    lastname: '',
    phone: '',
    password: '',
    ConfirmPass: '',
    role: ''
  };
$scope.signup = function() {
  if ($scope.user.role=='undefined' || $scope.user.role=='') {
    var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: "Veuillez choisir un role svp!"
      });
  }
  else
  if ($scope.user.password != $scope.user.ConfirmPass) {
    var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: "Veuillez saisir des mots de passe identiques svp!"
      });
  } else{

    AuthService.register($scope.user).then(function(msg) {
      $state.go('menu.login');
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: message
      });
    }, function(errMsg) {
      if (errMsg == 'Cet utilisateur existe déjà')
      {
        var alertPopup = $ionicPopup.alert({
          title: 'Register failed!',
          template: errMsg
        });
      }
      else {
        var alertPopup = $ionicPopup.alert({
          title: 'Register success!',
          template: errMsg
        });
          $state.go('menu.login');
      }

    });
  }
  };

}])

.controller('profilCtrl', ['$scope', 'AuthService', 'API_ENDPOINT', '$http', '$state',function($scope, AuthService, API_ENDPOINT, $http, $state) {

    $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {
      console.log('result '+ result);
      console.log('result.data '+ result.data);
      console.log('result.data.message '+ result.data.message);
      $scope.firstname = result.data.user[0].firstname;
      $scope.lastname = result.data.user[0].lastname;
      $scope.address = result.data.user[0].address;
    });
}])



/*.controller('principalResponsibleCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])*/

.controller('updateProfilCtrl', ['$scope', 'dateFilter','AuthService', 'API_ENDPOINT', '$http', '$ionicPopup', '$state',function($scope, dateFilter, AuthService, API_ENDPOINT, $http, $ionicPopup, $state) {
 /* $scope.user = {
    firstname: '',
    lastname: '',
    phone: '',
    password: '',
    ConfirmPass: ''
  };*/



  $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {
    console.log('result.data.user[0].phone '+result.data.user[0].phone);
      $scope.user = {
      firstname: result.data.user[0].firstname,
      lastname: result.data.user[0].lastname,
      phone: result.data.user[0].phone,
      birthdate: dateFilter(result.data.user[0].birthdate, 'yyyy-MM-dd'),
      address: result.data.user[0].address,
      password: result.data.user[0].password,
      mail: result.data.user[0].mail
    };
    });

    $scope.update = function() {
      console.log('result.data.user[0].password '+$scope.user.password);
       /* AuthService.update($scope.user).then(function(msg) {
          $state.go('profil');
          var alertPopup = $ionicPopup.alert({
            title: 'Update success!',
            template: message
          });
        }, function(errMsg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Update failed!',
            template: errMsg
          });
        });*/
      $http.post(API_ENDPOINT.url + '/person/update', $scope.user).then(function(result) {
        if (result.data.success) {
          if(result.data.data.length>0){
           // resolve(result.data.message);
            var alertPopup = $ionicPopup.alert({
            title: 'Update success!',
            template: result.data.message
          });
             $state.go('profil');
          }
          else{
            //reject(result.data.message);
            var alertPopup = $ionicPopup.alert({
            title: 'Update Failed!',
            template: result.data.message
          });
          }
        } else {
          //reject(result.data.message);
          var alertPopup = $ionicPopup.alert({
            title: 'Update Failed!',
            template: result.data.message
          });
        }
      });

      };

}])
