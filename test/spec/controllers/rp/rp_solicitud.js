'use strict';

describe('Controller: RpRpSolicitudCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var RpRpSolicitudCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RpRpSolicitudCtrl = $controller('RpRpSolicitudCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RpRpSolicitudCtrl.awesomeThings.length).toBe(3);
  });
});
