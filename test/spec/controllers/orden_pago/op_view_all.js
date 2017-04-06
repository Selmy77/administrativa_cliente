'use strict';

describe('Controller: OrdenPagoOpViewAllCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var OrdenPagoOpViewAllCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrdenPagoOpViewAllCtrl = $controller('OrdenPagoOpViewAllCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OrdenPagoOpViewAllCtrl.awesomeThings.length).toBe(3);
  });
});
