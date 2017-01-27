angular.module('app.services', [])

.factory('SmsFactory', [function(){

  return {
    sms: {
      number: '',
      message: ''
    }
    // Other methods or objects can go here
  };
}])


.service('SmsService', [function(){

}])
 
.service('AuthService', function($q, $http, API_ENDPOINT) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var isAuthenticated = false;
  var authToken;
 
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }
 
  var storeUserCredentials =function(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }
 
  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;
 
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }
 
  var register = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/person/create', user).then(function(result) {
        if (result.data.success) {
          if(result.data.result.length>0){
            resolve(result.data.message);
          }
          else{
            reject(result.data.message);
          }
        } else {
          reject(result.data.message);
        }
      });
    });
  };

  
 
  /*var login = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/person/login', user).then(function(result) {
        if (result.data.success) {
          if(result.data.result.length>0){
            console.log('result.data.token ='+result.data.token);
            storeUserCredentials(result.data.token);
            resolve(result.data.message);
          }
          else{
            reject("Ce compte n'existe pas!!");
          }

        } else {
          reject(result.data.message);
        }
      });
    });
  };*/
 
  var logout = function() {
    destroyUserCredentials();
  };
 
  loadUserCredentials();
 
  return {
    storeUserCredentials: storeUserCredentials,
    register: register,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
  };
})

 
.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

 
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});