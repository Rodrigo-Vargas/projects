'use strict';

/**
 * @ngdoc function
 * @name webAppApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('SignupCtrl', function ($scope, $location) {

    $scope.sendForm = function() {
      var valid = true;
      if (valid)
      {
        $location.path('/dashboard');
      }
      else
      {
        $("#invalid-login").show();
      }
    };
  });
