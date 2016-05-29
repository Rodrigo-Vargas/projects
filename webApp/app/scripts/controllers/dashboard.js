'use strict';

/**
 * @ngdoc function
 * @name webAppApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('DashboardCtrl', function ($scope) {
    $scope.customers = [
      {
        id : 1,
        name : 'Facebook'
      },
      {
        id : 2,
        name : 'Google'  
      }      
    ];

    $scope.taskCustomer = $scope.customers[0];

    console.log($scope.customers);

    $scope.tasks = [
      {
        description : 'Task 1',
        start : '00 : 00',
        end : '10 : 00',
        customer : $scope.customers[0]
      },
       {
        description : 'Task 2',
        start : '00 : 00',
        end : '10 : 00',
        customer : $scope.customers[1]
      },
    ];

    $scope.taskStart = '00:00';
    $scope.taskEnd = '00:00';

    $scope.addCustomer = function() {
      $scope.customers.push('To Do');
    };

    $scope.addTask = function() {
      $scope.tasks.push({
                          description : $scope.taskDescription,
                          start : $scope.taskStart,
                          end : $scope.taskEnd,
                          customer : $scope.taskCustomer
                        }
      );
      $scope.taskDescription = '';
      $scope.taskStart = '00:00';
      $scope.taskEnd = '00:00';
    };
  });
