angular.module('app.routes', [])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider){
      //$httpProvider.defaults.useXDomain = true;
      //delete $httpProvider.defaults.headers.common['X-Requested-With'];
      //$httpProvider.defaults.headers.common['token'] = sessionStorage.token;

  $stateProvider



    .state('menu.accueil', {
    url: '/accueil',
    views: {
      'side-menu21': {
        templateUrl: 'templates/accueil.html',
        controller: 'accueilCtrl'
      }
    }
  })


  .state('menu.login', {
    url: '/login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('menu.sIGNUP', {
    url: '/register',
    views: {
      'side-menu21': {
        templateUrl: 'templates/sIGNUP.html',
        controller: 'sIGNUPCtrl'
      }
    }
  })

  .state('profil', {
    url: '/profil',
    templateUrl: 'templates/profil.html',
    controller: 'profilCtrl'
  })

  .state('ResponsibleProfil', {
    url: '/ResponsibleProfil',
    templateUrl: 'templates/responsibleProfil.html',
    controller: 'profilCtrl'
  })

  .state('manageResponsibleByEldest', {
    url: '/manageResponsibleByEldest',
    templateUrl: 'templates/manageResponsibleByEldest.html',
    controller: 'manageResponsibleByEldestCtrl'
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })


  .state('principalEldest', {
    url: '/principalEldest',
    templateUrl: 'templates/principalEldest.html',
    controller: 'principalEldestCtrl'
  })

  .state('updateProfil', {
    url: '/updateProfil',
    templateUrl: 'templates/updateProfil.html',
    controller: 'updateProfilCtrl'
  })

  /*.state('prescription', {
    url: '/prescription',
    templateUrl: 'templates/main2.html',
    controller: 'prescriptionCtrl'
  })*/


.state('allViewResponsiblePrescription', {
  url: '/allViewResponsiblePrescription',
  templateUrl: 'templates/allViewResponsiblePrescription.html',
  controller: 'allViewCtrl'
})

.state('allViewEldestPrescription', {
  url: '/allViewEldestPrescription',
  templateUrl: 'templates/allViewEldestPrescription.html',
  controller: 'allViewCtrl'
})



.state('create', {
  url: '/create',
  templateUrl: 'templates/create.html',
  controller: 'createCtrl'
})

.state('todayView', {
  url: '/todayView',
  templateUrl: 'templates/todayView.html',
  controller: 'todayViewCtrl'
})

.state('principalResponsible', {
  url: '/principalResponsible',
  templateUrl: 'templates/principalResponsible.html',
  controller: 'manageEldestByResponsibleCtrl'
})

.state('manageEldestByResponsible', {
  url: '/manageEldestByResponsible',
  templateUrl: 'templates/manageEldestByResponsible.html',
  controller: 'manageEldestByResponsibleCtrl'
})

  .state('addEldest', {
    url: '/addEldest',
    templateUrl: 'templates/addEldest.html',
    controller: 'responsibleProfilCtrl'
  })

  .state('contacts', {
    url: '/contacts',
    templateUrl: 'templates/contacts.html',
    controller: 'contactsCtrl'
  })

  .state('sms', {
    url: '/sms',
    templateUrl: 'templates/sms.html',
    controller: 'smsCtrl'
  })

  .state('sites', {
    url: '/sites',
    templateUrl: 'templates/sites.html',
    controller: 'sitesCtrl'
  })

  .state('siteView', {
    url: '/siteView',
    templateUrl: 'templates/siteView.html'
    //,controller: 'siteViewCtrl'
  })

  .state('newSite', {
    url: '/newSite',
    templateUrl: 'templates/newSite.html'
    ,controller: 'newSiteCtrl'
  })

  .state('jeux', {
    url: '/jeux',
    templateUrl: 'templates/jeux.html'
    //,controller: 'jeuxCtrl'
  })

  .state('outside', {
    url: '/outside',
    abstract: true,
    templateUrl: 'templates/outside.html'
  })
  /*.state('outside.login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })*/
  /*.state('outside.register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })*/
  .state('inside', {
    url: '/inside',
    templateUrl: 'templates/inside.html',
    controller: 'InsideCtrl'
  })

$urlRouterProvider.otherwise('/menu/accueil')




}]);
