'use strict';

describe('Directive: concepto/conceptoPorRubroListar', function () {

  // load the directive's module
  beforeEach(module('financieraClienteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<concepto/concepto-por-rubro-listar></concepto/concepto-por-rubro-listar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the concepto/conceptoPorRubroListar directive');
  }));
});
