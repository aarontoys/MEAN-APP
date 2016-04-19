app.config(function ($routeProvider, $httpProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'templates/students.html',
      restricted: true,
      preventLoggedIn: false
    })
    .when('/register',{
      template: '<div app-register></div>',
      restricted: false,
      preventLoggedIn: true
    })
    .when('/login', {
      template: '<div app-login></div>',
      restricted: false,
      preventLoggedIn: true
    })
    .when('/logout', {
      restricted: false,
      preventLoggedIn: false,
      resolve: {
        test: function(authService, $location) {
          authService.logout();
          $location.path('/login');
        }
      } 
    })
   .otherwise({redirectTo: '/login'});
   $httpProvider.interceptors.push('authInterceptor');
});

app.run(function($rootScope, $location, $window, authService) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    // if restricted and no token
    if(next.restricted && !$window.localStorage.getItem('token')) {
      $location.path('/login');
    }
    // if token and prevent logging in
    if(next.preventLoggedIn && $window.localStorage.getItem('token')) {
      $location.path('/');
    }
  });
});