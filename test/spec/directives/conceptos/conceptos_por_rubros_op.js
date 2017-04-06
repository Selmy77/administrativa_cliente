'use strict';

describe('Directive: conceptos/conceptosPorRubrosOp', function () {

  // load the directive's module
  beforeEach(module('financieraClienteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<conceptos/conceptos-por-rubros-op></conceptos/conceptos-por-rubros-op>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the conceptos/conceptosPorRubrosOp directive');
  }));
});
