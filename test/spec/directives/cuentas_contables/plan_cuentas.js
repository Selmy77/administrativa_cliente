'use strict';

describe('Directive: cuentasContables/planCuentas', function () {

  // load the directive's module
  beforeEach(module('financieraClienteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cuentas-contables/plan-cuentas></cuentas-contables/plan-cuentas>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cuentasContables/planCuentas directive');
  }));
});
