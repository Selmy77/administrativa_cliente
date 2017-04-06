'use strict';

describe('Controller: RpRpRegistroCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var RpRpRegistroCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RpRpRegistroCtrl = $controller('RpRpRegistroCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RpRpRegistroCtrl.awesomeThings.length).toBe(3);
  });
});
