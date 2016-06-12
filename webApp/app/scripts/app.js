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
    'ui.utils.masks',
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
    var tasks = [{
                description : 'Task 1',
                duration : '02:00',
                start : '10:00',
                end : '12:00',
                customer : { id : 1, name: 'Facebook' }
              },
               {
                description : 'Task 2',
                duration : '02:00',
                start : '08:00',
                end : '10:00',
                customer : { id : 2, name: 'Google' }
              }];
      var agenda = [
      {
        date : 'Thu, 26 May',
        workTime : '06:00',
        tasks : tasks
      }
    ];
        
    $httpBackend.whenPOST('/api/login').respond(function(method, url, data, headers){
      var dataReturned;
      var jsonData = JSON.parse(data);

      if (jsonData.email == "admin" && jsonData.password == "admin")
      {
        dataReturned =  { "success": true, "token": "1234" };
      }
      else
      {
        dataReturned =  {  "success" : false,
                            "message" : "Check your email address and/or password"
                        };
      }
      return [200, dataReturned, {}];
    });

    $httpBackend.whenPOST('/api/signup').respond(function(method, url, data, headers){
      var  dataReturned =  {  "success" : true,
                            "token" : "1234"
                        };

      return [200, dataReturned, {}];
    });

    $httpBackend.whenGET('/api/customers/getByUser').respond(function(method, url, data, headers){

      var dataReturned = { 'success' : true,
                           'customers' : [{ id : 1, name: 'Facebook' },
                                          { id : 2, name: 'Google' }]
                         };

      return [200, dataReturned, {}];
    });

    $httpBackend.whenGET('/api/tasks/getByUser').respond(function(method, url, data, headers){
      var dataReturned = { 'success' : true,
                           'agenda' : agenda
                         };

      return [200, dataReturned, {}];
    });

    $httpBackend.whenPOST('/api/tasks/add').respond(function(method, url, data, headers){
      var dataReturned;
      var jsonData = JSON.parse(data);

      tasks.push({description : jsonData.description,
                duration : '02:00',
                start : jsonData.start,
                end : jsonData.end,
                customer : jsonData.customer});
      return [200, { success : true, tasks : tasks }, {}];
    });
  });
