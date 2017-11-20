var app = angular.module("app", ['ngRoute', 'ngDialog', 'ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {controller: 'HomeController', templateUrl: 'pages/home.html'})
    .when('/blink', {controller: 'KonashiBlinkController', templateUrl: 'pages/blink.html'})
    .otherwise({redirectTo: '/'});
}]);
app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);
