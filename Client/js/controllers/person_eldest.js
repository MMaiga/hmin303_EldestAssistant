angular.module('app.eldestCtrl', [])


.controller('principalEldestCtrl', ['$scope', 'AuthService', 'API_ENDPOINT', '$http', '$state',function($scope, AuthService, API_ENDPOINT, $http, $state) {
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
    $state.go('menu.login');
  };
}])


.controller('manageResponsibleByEldestCtrl', ['$scope', 'AuthService', 'API_ENDPOINT', '$ionicPopup', '$state', '$http',function($scope, AuthService, API_ENDPOINT, $ionicPopup, $state, $http) {
  $scope.responsibleSearched = {
    phone: ''
  };
  $scope.memberinfo;
  $scope.responsibleFounded;


  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {
      console.log('getInfo : result.data.success '+ result.data.success);
      console.log('getInfo : result.data.message '+ result.data.message);
      console.log('getInfo : result.data.user '+ result.data.user[0]);
      $scope.memberinfo = result.data.user[0];
      return result.data.message;
    });
  };



    $scope.getInfo();





    $scope.ngStyleRelationEldestResponsible = function(eldest,templateArea)
    {
      var myObj;
      console.log( "ngStyleRelationEldestResponsible  x"+eldest);
      if (eldest.state == 1)
      {
        if (templateArea == "layout")
        {
          myObj ={"backgroundColor" : "#87bdd8","padding-top": "0px",    "padding-right": "0px" ,    "padding-bottom": "0px" ,    "padding-left": "0px" };
        }
        else if (templateArea == "header")
        {
          myObj ={"backgroundColor" : "#b7d7e8", "margin-left": "auto", "margin-right": "auto",  "width": "100%" };
        }
        else if (templateArea == "body")
        {
          myObj ={"backgroundColor" : "#cfe0e8","padding-top": "10px",    "padding-right": "10px" ,    "padding-bottom": "10px" ,    "padding-left": "10px" };
        }
        else if (templateArea == "footer")
        {
          myObj ={"backgroundColor" : "#daebe8","padding-top": "10px","margin-left": "auto", "margin-right": "auto",  "width": "100%" };
        }
      }
      else if (eldest.state == 0)
      {
        if (templateArea == "layout")
        {
          myObj ={"backgroundColor" : "#c5d5c5","padding-top": "0px",    "padding-right": "0px" ,    "padding-bottom": "00px" ,    "padding-left": "0px" };
        }
        else if (templateArea == "header")
        {
          myObj ={"backgroundColor" : "#9fa9a3","margin-left": "auto", "margin-right": "auto",  "width": "100%"};
        }
        else if (templateArea == "body")
        {
          myObj ={"backgroundColor" : "#e3e0cc","padding-top": "10px",    "padding-right": "10px" ,    "padding-bottom": "10px" ,    "padding-left": "10px" };
        }
        else if (templateArea == "footer")
        {
          myObj ={"backgroundColor" : "#f0f0f0","padding-top": "10px","margin-left": "auto", "margin-right": "auto",  "width": "100%" };
        }
      }
      else
      {
        if (templateArea == "layout")
        {
          myObj ={"backgroundColor" : "#c5d5c5","padding-top": "0px",    "padding-right": "0px" ,    "padding-bottom": "00px" ,    "padding-left": "0px" };
        }
        else if (templateArea == "header")
        {
          myObj ={"backgroundColor" : "#9fa9a3","margin-left": "auto", "margin-right": "auto",  "width": "100%"};
        }
        else if (templateArea == "body")
        {
          myObj ={"backgroundColor" : "#e3e0cc","padding-top": "10px",    "padding-right": "10px" ,    "padding-bottom": "10px" ,    "padding-left": "10px" };
        }
        else if (templateArea == "footer")
        {
          myObj ={"backgroundColor" : "#f0f0f0","padding-top": "10px","margin-left": "auto", "margin-right": "auto",  "width": "100%" };
        }
      }
      return myObj;
    }


  $scope.searchResponsible = function()
  {
    console.log("searchResponsible"+$scope.responsibleSearched.phone);

    $http.get(API_ENDPOINT.url + '/person_eldest/readResponsible?phone='+$scope.responsibleSearched.phone).then(function(result) {
      console.log('result '+ result);
      console.log('result.data '+ result.data);
      console.log('result.data.message '+ result.data.message);
      $scope.responsibleFounded = result.data.data[0];
      console.log('$scope.responsibleFounded  '+ $scope.responsibleFounded );

      if (result.data.success)
      {
        var alertPopup = $ionicPopup.alert({
          title: 'searchResponsible success',
          template: $scope.responsibleFounded.firstname + " " + $scope.responsibleFounded.lastname
          +" trouvé"

        });
      }
      else {
        var alertPopup = $ionicPopup.alert({
          title: 'searchResponsible failed',
          template: "Aucun responsable n'est enregistré au numéro "+$scope.responsibleSearched.phone
        });

      }


  });

  };




  $scope.addResponsible = function()
  {
    console.log("addResponsible"+$scope.responsibleFounded.id);

    $http.get(API_ENDPOINT.url + '/person/ResponsibleLinkEldest?idResponsible='+$scope.responsibleFounded.id+"&idEldest="+$scope.memberinfo.id+"&senderRole=1").then(function(result) {
      console.log('result '+ result);
      console.log('result.data '+ result.data)
      console.log('result.data.success '+ result.data.success);
      console.log('result.data.message '+ result.data.message);


      if (result.data.success) {

          var alertPopup = $ionicPopup.alert({
            title: 'addResponsible success!',
            template: "Vous avez choisi "+$scope.responsibleFounded.lastname + " " +$scope.responsibleFounded.firstname + " comme responsable"
          });


      } else
      {

        var alertPopup = $ionicPopup.alert({
            title: 'addResponsible failed!',
            template: "Vous avez déja choisi "+$scope.responsibleFounded.lastname  + " " +$scope.responsibleFounded.firstname
          });
        }

        $scope.responsibleFounded =null ;
        console.log($scope.responsibleFounded );
        $scope.eldestGetResponsible();

    });







  };

  $scope.eldestGetResponsible = function()
  {

    $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {
      console.log('getInfo : result.data.success '+ result.data.success);
      console.log('getInfo : result.data.message '+ result.data.message);
      console.log('getInfo : result.data.user '+ result.data.user[0]);
      $scope.memberinfo = result.data.user[0];

    console.log("responsibleGetResponsible : "+$scope.memberinfo.id);
    console.log(API_ENDPOINT.url + '/person_eldest/eldestGetResponsible?id='+$scope.memberinfo.id);


    $http.get(API_ENDPOINT.url + '/person_eldest/eldestGetResponsible?id='+$scope.memberinfo.id).then(function(result) {
      console.log('result '+ result);
      console.log('result.data '+ result.data);
      console.log('result.data.message '+ result.data.message);
      $scope.responsibleInCharge = result.data.data;
      for (var responsibleCtrl in $scope.responsibleInCharge) {
        console.log(responsibleCtrl);
      }
      console.log('$scope.responsibleInCharge  '+ $scope.responsibleInCharge );
    });

  });

  };

    $scope.eldestGetResponsible();

  $scope.getResponsible = function() {
    $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {
      console.log('result.data.message '+ result.data.message);
      $scope.memberinfo = result.data.message;
    });
  };


  $scope.removeResponsible = function(responsible)
  {
    console.log("removeResponsible : "+responsible.id);

        $http.delete(API_ENDPOINT.url + '/person_eldest/eldestRemoveResponsible?idEldest='+$scope.memberinfo.id+"&idResponsible="+responsible.id).then(function(result) {
          console.log('result '+ result);
          console.log('result.data '+ result.data);
          console.log('result.data.message '+ result.data.message);
          if (result.data.success) {

            if (state == 1)
            {
              var alertPopup = $ionicPopup.alert({
                title: 'removeResponsible success!',
                template: "Vous avez supprimée le responsable "+responsible.lastname + " " +responsible.firstname
              });

            }}

        });
};

  $scope.acceptResponsible = function(responsible , state)
  {
    console.log("acceptResponsible : "+responsible.id);

        $http.get(API_ENDPOINT.url + '/person_eldest/eldestAcceptResponsible?idEldest='+$scope.memberinfo.id+"&idResponsible="+responsible.id+"&state="+state).then(function(result) {
          console.log('result '+ result);
          console.log('result.data '+ result.data);
          console.log('result.data.message '+ result.data.message);
          if (result.data.success) {

            if (state == 1)
            {
              var alertPopup = $ionicPopup.alert({
                title: 'acceptResponsible success!',
                template: "Vous avez accepté le responsable "+responsible.lastname + " " +responsible.firstname
              });
            }
            else if (state == -1)
            {
              var alertPopup = $ionicPopup.alert({
                title: 'acceptResponsible success!',
                template: "Vous avez refusé le responsable "+responsible.lastname + " " +responsible.firstname
              });
            }
          } else
          {

            var alertPopup = $ionicPopup.alert({
              title: 'acceptResponsible failed!',
              template: "Erreur sur responsable "+$scope.responsibleFounded.lastname  + " " +$scope.responsibleFounded.firstname
            });
          }
        });



  };


  $scope.destroySession = function() {
    AuthService.logout();
  };



  $scope.logout = function() {
    AuthService.logout();
    $state.go('menu.login');
  };





}])
