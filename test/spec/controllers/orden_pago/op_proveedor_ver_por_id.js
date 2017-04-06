'use strict';

describe('Controller: OrdenPagoOpProveedorVerPorIdCtrl', function () {

  // load the controller's module
  beforeEach(module('financieraClienteApp'));

  var OrdenPagoOpProveedorVerPorIdCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrdenPagoOpProveedorVerPorIdCtrl = $controller('OrdenPagoOpProveedorVerPorIdCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OrdenPagoOpProveedorVerPorIdCtrl.awesomeThings.length).toBe(3);
  });
});
