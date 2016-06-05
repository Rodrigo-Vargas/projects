'use strict';

/**
 * @ngdoc function
 * @name webAppApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('DashboardCtrl', function ($scope, $http) {
    $scope.customers = [];
    $scope.workdDays = [];

    $scope.loadCustomers = function() {
      $http({
          method: 'GET',
          url: '/api/customers/getByUser',
          data: $scope.formData
        })
      .then(function successCallback(response) {
        $scope.customers = response.data.customers;
        $scope.taskCustomer = $scope.customers[0];
      });
    }

    $scope.loadTasks = function() {
      $http({
          method: 'GET',
          url: '/api/tasks/getByUser',
          data: $scope.formData
        })
      .then(function successCallback(response) {
        if (response.data.success == true)
          console.log(response.data.agenda);
          $scope.workDays = response.data.agenda;
      });
    }

    // Initialize
    $scope.loadCustomers();
    $scope.loadTasks();

    $scope.taskStart = '00:00';
    $scope.taskEnd = '00:00';

    $scope.addCustomer = function() {
      $scope.customers.push('To Do');
    };

    $scope.addTask = function() {
      // check to make sure the form is completely valid
      $scope.taskSubmitted = true;
      if (!$scope.taskForm.$valid) {
        return;
      }

      $http({
          method: 'POST',
          url: '/api/tasks/add',
          data: $scope.newTask
      })
      .then(function successCallback(response) {
        if (response.data.success == true)
        {
          $scope.tasks = response.data.tasks;

          $scope.newTask.description = '';
          $scope.newTask.start = '00:00';
          $scope.newTask.end = '00:00';
          $scope.taskCustomer = $scope.customers[0];
        }
      });
    };
  });
