angular.module('app')

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
  responsible: 'responsible_role',
  eldest: 'eldest_role'
})

.constant('API_ENDPOINT', {
  url: 'http://ouwasav.com:4000/api'
  //  For a simulator use: url: 'http://127.0.0.1:8080/api'
});
