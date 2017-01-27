    angular.module('app.prescriptionCtrl', [])

    .controller('prescriptionsCtrl', ['$scope', 'AuthService', 'API_ENDPOINT', '$ionicPopup', '$state', '$http', function($scope, AuthService, API_ENDPOINT, $ionicPopup, $state, $http) {
      $scope.getPrescription = function() {
        $http.get(API_ENDPOINT.url + '/prescription').then(function(result) {
          console.log('result.data.message ' + result.data.message);
          for (var i = 0; i < result.data.data.length; i++) {
            // Iterate over numeric indexes from 0 to 5, as everyone expects.
            console.log(result.data.data[i]);
          }
          $scope.prescriptions = result.data.data;
        });
      };

    }])

    .controller('createCtrl', ['$scope','dateFilter', 'API_ENDPOINT', '$ionicPopup', '$state', '$http',
    function($scope,dateFilter, API_ENDPOINT, $ionicPopup, $state, $http) {

      //En attendant la création du service
      $scope.responsibleGetEldest = function()
      {
        $scope.personID;
        $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {

          $scope.personID = result.data.user[0].id;

            $http.get(API_ENDPOINT.url + '/person_responsible/responsibleGetEldest?id='+$scope.personID).then(function(result) {

            $scope.eldestInCharge = result.data.data;
            for (var eldest in $scope.eldestInCharge) {
              console.log(eldest);
            }

          });
        });


      };

      $scope.responsibleGetEldest();
      //En attendant la création du service


      $scope.prescription = {
        description: '',
        completion_date:'',
        personID:''
      };

      /*$scope.showSelectValue = function(mySelect) {
        console.log("mahshad : " + mySelect)
        //var selectedValue = mySelect
      }*/

      $scope.save = function(ID) {
        if ($scope.prescription.description=='undefined' || $scope.prescription.description=='') {
          var alertPopup = $ionicPopup.alert({
            title: 'Create failed!',
            template: "Veuillez saisir la description svp!"
          });
        }
        else
        if ($scope.prescription.completion_date=='undefined' || $scope.prescription.completion_date=='') {
          var alertPopup = $ionicPopup.alert({
            title: 'Create failed!',
            template: "Veuillez choisir une completiondate svp!"
          });
        }
        else{
          var date = $scope.prescription.completion_date    ;
          dateString = dateFilter(date, 'yyyy-MM-dd');

          $scope.prescription = {
            responsibleID:ID,
            personID:$scope.prescription.personID,
            description: $scope.prescription.description,
            completion_date:dateString
          };


          $http.post(API_ENDPOINT.url + '/prescription/create', $scope.prescription)
          .then(function(result) {
            if (result.data.success) {
              if(result.data.data.affectedRows>0){
                var alertPopup = $ionicPopup.alert({
                  title: 'Create success!',
                  template: "prescription added"
                });
                $state.go('allViewResponsiblePrescription');
              }
              else{
                var alertPopup = $ionicPopup.alert({
                  title: 'Create failed!',
                  template: "prescription not added"
                });
              }

            } else {
              console.log(result.data.message);
              var alertPopup = $ionicPopup.alert({
                title: 'Create failed!',
                template: result.data.message
              });
            }
          });
        }



      }
    }])

    .controller('todayViewCtrl', ['$scope','dateFilter','$cordovaSms', 'API_ENDPOINT', '$ionicPopup', '$state', '$http', function($scope,dateFilter,$cordovaSms, API_ENDPOINT, $ionicPopup, $state, $http) {

    personID = '' ;
      $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {

      personID = result.data.user[0].id;

      $scope.getPrescription();

    });

//getPrescription
  $scope.getPrescription = function(prescription) {
$http.get(API_ENDPOINT.url + '/prescription/now?id='+ personID).then(function(result) {

   for (var i = 0; i < result.data.data.length; i++) {
     // Iterate over numeric indexes from 0 to 5, as everyone expects.
     console.log(result.data.data[i]);
   }
   $scope.prescriptions = result.data.data;
 });

}
    //update
    $scope.validPrescription = function(prescription) {
      console.log("prescription " + prescription);
    $http.get(API_ENDPOINT.url + '/prescription/validPrescription?id='+ prescription.prId).then(function(result) {
       for (var i = 0; i < result.data.data.length; i++) {
         // Iterate over numeric indexes from 0 to 5, as everyone expects.
         console.log(result.data.data[i]);
       }
       $scope.getPrescription();
     });
}



        $scope.getInfoPrescription = function(prescription) {

          var str = "<p>" + "ResponsibleName: "+ prescription.lastname +"</p>"
                    +"<p>"+ "CreationDate: " + dateFilter(prescription.creation_date, 'yyyy-MM-dd') + "</p>"
                    +"<p>"+ "CompletionDate: " + dateFilter(prescription.completion_date, 'yyyy-MM-dd') + "</p>"

          var alertPopup = $ionicPopup.alert({
            title: 'Info!',
            template: str
          });
        }

//SMS

document.addEventListener("deviceready", function() {

  var options = {
    replaceLineBreaks: false, // true to replace \n by a new line, false by default
    android: {
      intent: '' // send SMS with the native android SMS messaging
        //intent: '' // send SMS without open any other app
        //intent: 'INTENT' // send SMS inside a default SMS app
    }
  };

  $scope.sendSMS = function(resp) {
    console.log("resp :" + resp);
    $cordovaSms
      .send(resp, "prescription is valid", options)
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


    .controller('allViewCtrl', ['$scope','dateFilter', 'API_ENDPOINT', '$ionicPopup', '$state', '$http', function($scope,dateFilter, API_ENDPOINT, $ionicPopup, $state, $http) {

      personID = '' ;
      role = '' ;
        $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {

        personID = result.data.user[0].id;
        role = result.data.user[0].role;
        console.log("print 1" + personID);
        if(role == 0){
       $http.get(API_ENDPOINT.url + '/prescription/responsibleList?id='+ personID).then(function(result) {

          console.log('result.message ' + result.data.message);
          for (var i = 0; i < result.data.data.length; i++) {
            // Iterate over numeric indexes from 0 to 5, as everyone expects.
            console.log(result.data.data[i]);
          }
          $scope.prescriptions = result.data.data;

        });
      }
      else{
        $http.get(API_ENDPOINT.url + '/prescription/byDate?id='+ personID).then(function(result) {

           console.log("il est la :"+ API_ENDPOINT.url + '/prescription/byDate?id='+ personID);
           for (var i = 0; i < result.data.data.length; i++) {
             // Iterate over numeric indexes from 0 to 5, as everyone expects.
             console.log(result.data.data[i]);
           }
           $scope.prescriptions = result.data.data;
         });
       }
      });


      $scope.getInfoPrescription = function(prescription) {
        if(role == 0){
          var str = "<p>" + "EldestName: "+ prescription.lastname +"</p>"
                    +"<p>"+ "CreationDate: " + dateFilter(prescription.creation_date, 'yyyy-MM-dd') + "</p>"
                    +"<p>"+ "CompletionDate: " + dateFilter(prescription.completion_date, 'yyyy-MM-dd') + "</p>"
        }
        else {
          var str = "<p>" + "ResponsibleName: "+ prescription.lastname +"</p>"
                    +"<p>"+ "CreationDate: " + dateFilter(prescription.creation_date, 'yyyy-MM-dd') + "</p>"
                    +"<p>"+ "CompletionDate: " + dateFilter(prescription.completion_date, 'yyyy-MM-dd') + "</p>"
        }

        var alertPopup = $ionicPopup.alert({
          title: 'Info!',
          template: str
        });
      }

    }])
