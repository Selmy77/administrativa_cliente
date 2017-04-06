'use strict';

describe('Directive: proveedor/pvListar', function () {

  // load the directive's module
  beforeEach(module('financieraClienteApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<proveedor/pv-listar></proveedor/pv-listar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the proveedor/pvListar directive');
  }));
});
