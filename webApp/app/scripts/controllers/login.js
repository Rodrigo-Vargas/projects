'use strict';

/**
 * @ngdoc function
 * @name webAppApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('LoginCtrl', function ($scope, $http, $location, UserService) {

    $scope.loginMessage = "";

    $scope.sendForm = function() {
      $("#invalid-login").hide();

      $http({
        method: 'POST',
        url: '/api/login',
        data: $scope.formData
      }).then(function successCallback(response) {
        
        if (response.data.success == true)
        {
          var currentToken = UserService.setToken(response.data.token);
          $location.path('/dashboard');
        }
        else
        {
          $scope.loginMessage = response.data.message;
          $("#invalid-login").show();
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }
  });  

  
