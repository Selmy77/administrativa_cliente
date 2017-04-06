'use strict';

describe('Directive: rp/rpPorProveedorListar', function () {

  // load the directive's module
  beforeEach(module('financieraClienteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rp/rp-por-proveedor-listar></rp/rp-por-proveedor-listar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the rp/rpPorProveedorListar directive');
  }));
});
