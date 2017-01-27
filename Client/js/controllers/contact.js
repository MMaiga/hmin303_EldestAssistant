angular.module('app.contactCtrl', [])

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
