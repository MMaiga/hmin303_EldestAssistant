angular.module('app.siteCtrl', [])

.controller('sitesCtrl', ['$scope', 'API_ENDPOINT', '$http', '$state', '$ionicPopup',function($scope, API_ENDPOINT, $http, $state, $ionicPopup) {

    $http.get(API_ENDPOINT.url + '/category/CategSite').then(function(result) {

      	$scope.categories = result.data.data;
    });

    $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {
		console.log('result.data.user[0].id '+ result.data.user[0].id);
		$scope.personID = result.data.user[0].id;
	});

    $scope.GetList = function(cat,personID){

    	 $http.get(API_ENDPOINT.url + "/site/read?cat="+cat+"&&personID="+personID)
         .then(function(result) {

	      $scope.sites = result.data.data;
	    });
    	/*var alertPopup = $ionicPopup.alert({
        title: 'category!',
        template: "cat ="+cat+" pers ="+personID
      });*/

    }

    $scope.data = {
        showDelete: false
      };


      $scope.onItemDelete = function(site,id) {
        $http.delete(API_ENDPOINT.url + '/site/delete?id='+id).then(function(result) {

        });
        $scope.sites.splice($scope.sites.indexOf(site), 1);

      };
}])

.controller('newSiteCtrl', ['$scope', 'API_ENDPOINT', '$http', '$state', '$ionicPopup',function($scope, API_ENDPOINT, $http, $state, $ionicPopup) {

    $http.get(API_ENDPOINT.url + '/category/CategSite').then(function(result) {

        $scope.categories = result.data.data;
    });

    $http.get(API_ENDPOINT.url + '/person/memberinfo').then(function(result) {
        console.log('result.data.user[0].id '+ result.data.user[0].id);
        $scope.personID = result.data.user[0].id;
    });

     $scope.site = {
        link: '',
        category: ''
      };

    $scope.Create = function(personID){
        if ($scope.site.link=='undefined' || $scope.site.link=='') {
            var alertPopup = $ionicPopup.alert({
                title: 'Create failed!',
                template: "Veuillez saisir le lien svp!"
              });
          }
          else
            if ($scope.site.category=='undefined' || $scope.site.category=='') {
                var alertPopup = $ionicPopup.alert({
                title: 'Create failed!',
                template: "Veuillez choisir une categorie svp!"
              });
            }
          else{
            $scope.site = {
            personID:personID,
            link: $scope.site.link,
            category: $scope.site.category
          };
            $http.post(API_ENDPOINT.url + "/site/create", $scope.site)
             .then(function(result) {

             if (result.data.success) {
              if(result.data.data.affectedRows>0){
                var alertPopup = $ionicPopup.alert({
                    title: 'Create success!',
                    template: "Site added"
                  });
                $state.go('sites');
              }
              else{
                 var alertPopup = $ionicPopup.alert({
                    title: 'Create failed!',
                    template: "Site not added"
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
                 /*var alertPopup = $ionicPopup.alert({
                    title: 'Create failed!',
                    template: "prop ="+$scope.site.personID
                  });*/
              }

        }
}])
