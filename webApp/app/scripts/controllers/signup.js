'use strict';

/**
 * @ngdoc function
 * @name webAppApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('SignupCtrl', function ($scope, $location, $http, UserService) {

    $scope.sendForm = function() {
      $("#invalid-login").hide();

      $http({
        method: 'POST',
        url: '/api/signup',
        data: $scope.formData
      })
      .then(function successCallback(response) {        
        if (response.data.success == true)
        {
          var currentToken = UserService.setToken(response.data.token);
          $location.path('/dashboard');
        }
        else
        {
          $scope.signupMessage = response.data.message;
          $("#invalid-login").show();
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    };
  });
