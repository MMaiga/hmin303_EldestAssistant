angular.module('app.controllers', [])
 
.controller('LoginCtrl', ['$scope', 'AuthService', 'API_ENDPOINT', '$ionicPopup', '$state', '$http',function($scope, AuthService, API_ENDPOINT, $ionicPopup, $state, $http) {
  $scope.user = {
    phone: '',
    password: ''
  };
 
  $scope.login = function() {
    console.log('API_ENDPOINT.url ='+API_ENDPOINT.url);
      $http.post(API_ENDPOINT.url + '/person/login', $scope.user).then(function(result) {
        if (result.data.success) {
          if(result.data.result.length>0){
            console.log('result.data.token ='+result.data.token);
            AuthService.storeUserCredentials(result.data.token);
            console.log(result.data.result[0].role);
            var role = parseInt(result.data.result[0].role);
            if(role==0){
              $state.go('responsibleProfil');
            }
            else
              if(role==1){
              $state.go('principal');
            }
          }
          else{
            console.log("Ce compte n'existe pas!!");
          }

        } else {
          console.log(result.data.message);
        }
      });
    
    /*AuthService.login($scope.user).then(function(result) {
      console.log(result);
      $state.go('principal');
      
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
 
.controller('principalCtrl', ['$scope', 'AuthService', 'API_ENDPOINT', '$http', '$state',function($scope, AuthService, API_ENDPOINT, $http, $state) {
  $scope.destroySession = function() {
    AuthService.logout();
  };
 
  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {
      console.log('result '+ result);
      console.log('result.data '+ result.data);
      console.log('result.data.message '+ result.data.message);
      $scope.memberinfo = result.data.message;
    });
  };
 
  $scope.logout = function() {
    AuthService.logout();
    $state.go('menu.lOGIN');
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
   
/*.controller('lOGINCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])*/
   
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
      $state.go('menu.lOGIN');
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: message
      });
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg
      });
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
   
.controller('menuCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])
   
/*.controller('principalCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])*/
   
.controller('updateProfilCtrl', ['$scope', 'AuthService', 'API_ENDPOINT', '$http', '$ionicPopup', '$state',function($scope, AuthService, API_ENDPOINT, $http, $ionicPopup, $state) {
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
      birthdate: result.data.user[0].birthdate,
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
   
.controller('prescriptionCtrl', ['$scope', 'AuthService', 'API_ENDPOINT', '$http', '$state',function($scope, AuthService, API_ENDPOINT, $http, $state) {
 /* $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {
      $scope.id = result.data.user[0].id;

      $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {
      $scope.id = result.data.user[0].id;
      
    });
    });*/

}])
   
.controller('contactsCtrl', ['$scope','$cordovaSms', 'SmsFactory', '$cordovaContacts', '$ionicPopup', '$state', function($scope, $cordovaSms, SmsFactory, $cordovaContacts, $ionicPopup, $state) {


    $scope.getContactList = function() {
      var cSort=function(a,b){ 
        var an=a.name.formatted.toUpperCase();
        var bn=b.name.formatted.toUpperCase();
        return (an<bn)?-1:(an==bn)?0:1;
    };

      $cordovaContacts.find({filter: ''}).then(function(contacts) {
          $scope.contacts = contacts.sort(cSort);;
      }, function(error) {
          console.log("ERROR: " + error);
      }); 
    }

     $scope.sendSmsToContact = function(contact) {
        $scope.sms = {
            number: contact,
            message: 'Test : Je suis en danger!!'
          };
         SmsFactory.sms= $scope.sms;
            $state.go('sms');
    }

    $scope.isChecked = false;
    $scope.selected = [];  
    $scope.checkedOrNot = function (number, isChecked, index) {
        if (isChecked) {
            $scope.selected.push(number);
        }
        else {
            var _index = $scope.selected.indexOf(number);
            $scope.selected.splice(_index, 1);
        }
    }; 

    document.addEventListener("deviceready", function() {
 
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: '' // send SMS with the native android SMS messaging
          //intent: '' // send SMS without open any other app
          //intent: 'INTENT' // send SMS inside a default SMS app
      }
    };
 
    $scope.sendSmsToAll = function() {
    
     for (num in $scope.selected){
      $cordovaSms
        .send($scope.selected[num], "Test : I'm in danger!!!", options)
        .then(function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Success',
            template: "Success for "+ $scope.selected[num] +" !!"
          });
          // Success! SMS was sent
        }, function(error) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: "Error for "+ $scope.selected[num] +" !!"
          });
          // An error occurred
        });
       /* var alertPopup = $ionicPopup.alert({
            title: 'result',
            template: "Success for "+ $scope.selected[num] +" !!"
          });*/
    }
    }
    
  });

    

    $scope.createContact = function() {
      $cordovaContacts.save({"displayName": "Steve Jobs"}).then(function(contact) {
          console.log(JSON.stringify(contact));
      }, function(error) {
          console.log(error);
      });
    }   

    $scope.removeContact = function() {
      $cordovaContacts.remove({"displayName": "Steve Jobs"}).then(function(contact) {
          console.log(JSON.stringify(contact));
      }, function(error) {
          console.log(error);
      });
    }
    }])

.controller('smsCtrl', ['$scope', 'SmsFactory', '$cordovaSms', '$ionicPopup', function($scope, SmsFactory, $cordovaSms, $ionicPopup) {
  $scope.sms = SmsFactory.sms;
 
  document.addEventListener("deviceready", function() {
 
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: '' // send SMS with the native android SMS messaging
          //intent: '' // send SMS without open any other app
          //intent: 'INTENT' // send SMS inside a default SMS app
      }
    };
 
    $scope.sendSMS = function() {
 
      $cordovaSms
        .send($scope.sms.number, $scope.sms.message, options)
        .then(function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Success',
            template: "Success!!"
          });
          // Success! SMS was sent
        }, function(error) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: "Error!!"
          });
          // An error occurred
        });
    }
  });
}])


.controller('sitesCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])

.controller('responsibleProfilCtrl', ['$scope', 'AuthService', 'API_ENDPOINT', '$http', '$state',function($scope, AuthService, API_ENDPOINT, $http, $state) {
  $scope.destroySession = function() {
    AuthService.logout();
  };
 
  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {
      console.log('result.data.message '+ result.data.message);
      $scope.memberinfo = result.data.message;
    });
  };
 
  $scope.logout = function() {
    AuthService.logout();
    $state.go('menu.lOGIN');
  };

}])