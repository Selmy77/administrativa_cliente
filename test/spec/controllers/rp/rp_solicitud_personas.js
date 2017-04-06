'use strict';

describe('Controller: RpRpSolicitudPersonasCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var RpRpSolicitudPersonasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RpRpSolicitudPersonasCtrl = $controller('RpRpSolicitudPersonasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RpRpSolicitudPersonasCtrl.awesomeThings.length).toBe(3);
  });
});
