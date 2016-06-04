'use strict';

/**
 * @ngdoc service
 * @name webAppApp.UserService
 * @description
 * # UserService
 * Factory in the webAppApp.
 */
angular.module('webAppApp')
  .factory('UserService', function () {
    var token = '';

    return {
      getToken: function () {
        return token;
      },
      setToken: function(value) {
        token = value;
      }
    };
  });
