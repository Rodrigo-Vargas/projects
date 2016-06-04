'use strict';

describe('Controller: SignupCtrl', function () {
  // load the controller's module
  beforeEach(module('webAppApp'));

  var SignupCtrl,
    scope,
    $httpBackend,
    authRequestHandler;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    $httpBackend = $injector.get('$httpBackend');

    // backend definition common for all tests
    authRequestHandler = $httpBackend.when('POST', '/login')
                            .respond({userId: 'userX'}, {'A-Token': 'xxx'});

    scope = $rootScope.$new();
    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should fetch authentication token when login is correct', function() {
     $rootScope.sendForm();
     $httpBackend.flush();
  });
});
