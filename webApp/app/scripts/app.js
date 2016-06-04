'use strict';

/**
 * @ngdoc overview
 * @name webAppApp
 * @description
 * # webAppApp
 *
 * Main module of the application.
 */
angular
  .module('webAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMockE2E'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .otherwise({
        redirectTo: '/'
      });
      //$locationProvider.html5Mode(true);
  })
  .run(function($httpBackend) {
    $httpBackend.whenGET(/views\/.*/).passThrough();
    
    $httpBackend.whenPOST('/api/login').respond(function(method, url, data, headers){
      var dataReturned;
      var jsonData = JSON.parse(data);
      
      if (jsonData.email == "admin" && jsonData.password == "admin")
      {
        dataReturned =  {  
                  "success": true,
                  "token": "1234"
                };
      }
      else
      {
        dataReturned =  {  
                  "success" : false,
                  "message" : "Check your email address and/or password"
                };
      }
      return [200, dataReturned, {}];
    });
  });
