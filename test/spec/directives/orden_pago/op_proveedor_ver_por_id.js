'use strict';

describe('Directive: ordenPago/opProveedorVerPorId', function () {

  // load the directive's module
  beforeEach(module('financieraClienteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<orden-pago/op-proveedor-ver-por-id></orden-pago/op-proveedor-ver-por-id>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ordenPago/opProveedorVerPorId directive');
  }));
});
