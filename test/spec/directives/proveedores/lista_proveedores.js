'use strict';

describe('Directive: proveedores/listaProveedores', function () {

  // load the directive's module
  beforeEach(module('financieraClienteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<proveedores/lista-proveedores></proveedores/lista-proveedores>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the proveedores/listaProveedores directive');
  }));
});
