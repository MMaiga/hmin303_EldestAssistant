angular.module('app.responsibleCtrl', [])

.controller('manageEldestByResponsibleCtrl', ['$scope', 'AuthService', 'API_ENDPOINT', '$ionicPopup', '$state', '$http',function($scope, AuthService, API_ENDPOINT, $ionicPopup, $state, $http) {
  $scope.eldestSearched = {
    phone: ''
  };
  $scope.memberinfo;
  $scope.eldestStyle;


  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {
      console.log('getInfo : result.data.success '+ result.data.success);
      console.log('getInfo : result.data.message '+ result.data.message);
      console.log('getInfo : result.data.user '+ result.data.user[0]);
      $scope.memberinfo = result.data.user[0];
      return result.data.user[0];
    });
  };





  $scope.searchEldest = function()
  {
    console.log("searchEldest"+$scope.eldestSearched.phone);

    $http.get(API_ENDPOINT.url + '/person_responsible/readEldest?phone='+$scope.eldestSearched.phone).then(function(result) {
      console.log('result '+ result);
      console.log('result.data '+ result.data);
      console.log('result.data.message '+ result.data.message);
      $scope.eldestFounded = result.data.data[0];
      console.log('$scope.eldestFounded  '+ $scope.eldestFounded );
    });

    var alertPopup = $ionicPopup.alert({
      title: 'searchEldest',
      template: ' id : '+ $scope.eldestFounded.id
      +' firstname : '+$scope.eldestFounded.firstname
      +' lastname : '+$scope.eldestFounded.lastname
      +' username : '+$scope.eldestFounded.username
      +' birthdate : '+$scope.eldestFounded.birthdate
      +' address : '+$scope.eldestFounded.address
      +' mail : '+$scope.eldestFounded.mail
      +' phone : '+$scope.eldestFounded.phone
      +' role : '+$scope.eldestFounded.role
      +' photo : '+ $scope.eldestFounded.photo
    });

  };


  $scope.backgroundColorRelation;


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

  $scope.responsibleGetEldest = function()
  {

    $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {
      console.log('getInfo : result.data.success '+ result.data.success);
      console.log('getInfo : result.data.message '+ result.data.message);
      console.log('getInfo : result.data.user '+ result.data.user[0]);
      $scope.memberinfo = result.data.user[0];




    $http.get(API_ENDPOINT.url + '/person_responsible/responsibleGetEldest?id='+$scope.memberinfo.id).then(function(result) {
      console.log('result '+ result);
      console.log('result.data '+ result.data);
      console.log('result.data.message '+ result.data.message);
      $scope.eldestInCharge = result.data.data;
      for (var eldest in $scope.eldestInCharge) {
        console.log(eldest);
      }
      console.log('$scope.eldestInCharge  '+ $scope.eldestInCharge );
    });

  });

  };

  $scope.responsibleGetEldest ();



  $scope.addEldest = function()
  {
    console.log("addEldest"+$scope.eldestFounded.id);

    $http.get(API_ENDPOINT.url + '/person/ResponsibleLinkEldest?idEldest='+$scope.eldestFounded.id+"&idResponsible="+$scope.memberinfo.id+"&senderRole=0").then(function(result) {
      console.log('result '+ result);
      console.log('result.data '+ result.data)
      console.log('result.data.success '+ result.data.success);
      console.log('result.data.message '+ result.data.message);


      if (result.data.success) {

          var alertPopup = $ionicPopup.alert({
            title: 'addEldest success!',
            template: "Vous êtes maintenant responsable de "+$scope.eldestFounded.lastname + " " +$scope.eldestFounded.firstname
          });


      } else
      {

        var alertPopup = $ionicPopup.alert({
            title: 'addEldest failed!',
            template: "Vous êtes déja responsable de "+$scope.eldestFounded.lastname  + " " +$scope.eldestFounded.firstname
          });
        }

        $scope.eldestFounded = null;

    });




  };

  // A confirm dialog
$scope.showConfirmRemoveEldest = function(eldest) {
  var confirmPopup = $ionicPopup.confirm({
    title: 'Suppression relation Responsible Eldest',
    template: 'Voulez vous supprimer '+eldest.lastname + " " +eldest.firstname+' de votre de liste de Eldest en charge ?'
  });

  confirmPopup.then(function(res) {
    if(res) {
      $scope.removeEldest(eldest)
    } else {
      console.log('You are not sure');
    }
  });
};

  $scope.removeEldest = function(eldest)
  {
    var alertPopup = $ionicPopup.alert({
      title: 'removeEldest success!',
      template: "Vous avez supprimée le responsable "+eldest.lastname + " " +eldest.firstname
    });

    console.log("removeEldest : "+eldest.id);
    console.log(API_ENDPOINT.url + '/person_responsible/responsibleRemoveEldest?idResponsible='+$scope.memberinfo.id+"&idEldest="+eldest.id);

        $http.delete(API_ENDPOINT.url + '/person_responsible/responsibleRemoveEldest?idResponsible='+$scope.memberinfo.id+"&idEldest="+eldest.id).then(function(result) {
          console.log('result '+ result);
          console.log('result.data '+ result.data);
          console.log('result.data.message '+ result.data.message);
          if (result.data.success) {

            if (state == 1)
            {
              var alertPopup = $ionicPopup.alert({
                title: 'removeEldest success!',
                template: "Vous avez supprimée le responsable "+eldest.lastname + " " +eldest.firstname
              });
            }
          }
        });
  }

  $scope.acceptEldest = function(responsible , state)
  {

    console.log("acceptResponsible : "+responsible.id);

        $http.get(API_ENDPOINT.url + '/person_eldest/eldestAcceptResponsible?idEldest='+responsible.id+"&idResponsible="+$scope.memberinfo.id+"&state="+state).then(function(result) {
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
  }

  $scope.destroySession = function() {
    AuthService.logout();
  };



  $scope.getEldest = function() {
    $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {
      console.log('result.data.message '+ result.data.message);
      $scope.memberinfo = result.data.message;
    });
  };

  $scope.logout = function() {
    AuthService.logout();
    $state.go('menu.login');
  };





}])
