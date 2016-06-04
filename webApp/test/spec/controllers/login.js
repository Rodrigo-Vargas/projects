'use strict';

describe('Controller: LoginCtrl', function () {
  // load the controller's module
  beforeEach(module('webAppApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    $httpBackend = $injector.get('$httpBackend');

    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
